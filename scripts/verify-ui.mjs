import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import axe from 'axe-core';
import { chromium } from 'playwright';

const baseUrl = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:4200/';
const outputDir = 'artifacts/ui-review';

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });

async function checkNoHorizontalOverflow(page, label) {
  const sizes = await page.evaluate(() => ({
    contentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth
  }));
  assert.ok(sizes.contentWidth <= sizes.viewportWidth + 1,
    label + ': horizontal overflow: ' + JSON.stringify(sizes));
}

async function waitForRows(page, count) {
  await page.waitForFunction(
    expected => document.querySelectorAll('.todo-row').length === expected,
    count
  );
}

async function auditAccessibility(page, label) {
  await page.addScriptTag({ content: axe.source });
  const { violations } = await page.evaluate(async () => window.axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] }
  }));
  await writeFile(outputDir + '/accessibility-' + label + '.json',
    JSON.stringify(violations, null, 2));
  const details = violations.map(issue =>
    issue.id + ': ' + issue.nodes.map(node => node.target.join(' ')).join(', '));
  assert.deepEqual(details, [], 'Accessibility issues in ' + label + ': ' + details.join('; '));
}

async function run() {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const pageErrors = [];
  desktop.on('pageerror', error => pageErrors.push(error.message));

  await desktop.goto(baseUrl, { waitUntil: 'networkidle' });
  await waitForRows(desktop, 3);
  assert.match(await desktop.title(), /Angular Clean Architecture/);
  assert.match(await desktop.locator('.tasks-heading').innerText(), /2 pending/);
  await checkNoHorizontalOverflow(desktop, 'desktop');
  await desktop.screenshot({ path: outputDir + '/01-desktop-initial.png', fullPage: true });
  await auditAccessibility(desktop, 'desktop');

  // The checkbox changes both the UI and the repository's task state.
  await desktop.getByRole('checkbox', { name: 'Toggle completion for Write unit tests for use cases' }).check();
  await desktop.waitForFunction(() => document.querySelector('.tasks-heading')?.textContent?.includes('1 pending'));
  assert.strictEqual(
    await desktop.getByRole('checkbox', { name: 'Toggle completion for Write unit tests for use cases' }).isChecked(), true);

  // Add a task through the form, then filter and delete it.
  await desktop.getByRole('textbox', { name: 'Category' }).fill('Home');
  await desktop.getByRole('textbox', { name: 'Task title' }).fill('Clean the desk');
  await desktop.getByRole('button', { name: 'Add task' }).click();
  await waitForRows(desktop, 4);
  assert.match(await desktop.locator('.todo-list').innerText(), /Clean the desk/);

  await desktop.getByRole('searchbox', { name: 'Search tasks' }).fill('clean the desk');
  await waitForRows(desktop, 1);
  await desktop.getByRole('button', { name: 'Remove Clean the desk' }).click();
  await waitForRows(desktop, 0);
  assert.match(await desktop.locator('.tasks').innerText(), /No tasks match your search/);
  await desktop.screenshot({ path: outputDir + '/02-desktop-empty-search.png', fullPage: true });

  // In-memory state should reset on reload.
  await desktop.reload({ waitUntil: 'networkidle' });
  await waitForRows(desktop, 3);
  assert.match(await desktop.locator('.tasks-heading').innerText(), /2 pending/);
  assert.ok(!(await desktop.locator('body').innerText()).includes('Clean the desk'));

  // Keyboard focus and required form fields.
  assert.strictEqual(await desktop.locator('form').evaluate(form => form.checkValidity()), false);
  await desktop.locator('#category').focus();
  await desktop.keyboard.press('Tab');
  assert.strictEqual(await desktop.evaluate(() => document.activeElement?.id),
    'task-title', 'Keyboard Tab should reach the title input');
  // Whitespace-only values are rejected by the use case even if native required checks allow them.
  await desktop.getByRole('textbox', { name: 'Category' }).fill('Home');
  await desktop.getByRole('textbox', { name: 'Task title' }).fill('   ');
  await desktop.getByRole('button', { name: 'Add task' }).click();
  await desktop.getByRole('alert').waitFor();
  assert.match(await desktop.getByRole('alert').innerText(), /required/);
  await waitForRows(desktop, 3);
  assert.deepEqual(pageErrors, [], 'Unexpected desktop browser errors: ' + pageErrors.join('; '));

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true
  });
  const mobileErrors = [];
  mobile.on('pageerror', error => mobileErrors.push(error.message));
  await mobile.goto(baseUrl, { waitUntil: 'networkidle' });
  await waitForRows(mobile, 3);
  await checkNoHorizontalOverflow(mobile, 'mobile initial');
  await mobile.screenshot({ path: outputDir + '/03-mobile-initial.png', fullPage: true });
  await auditAccessibility(mobile, 'mobile');
  await mobile.getByRole('textbox', { name: 'Category' }).fill('Personal');
  await mobile.getByRole('textbox', { name: 'Task title' }).fill('Test mobile layout');
  await mobile.getByRole('button', { name: 'Add task' }).click();
  await waitForRows(mobile, 4);
  await checkNoHorizontalOverflow(mobile, 'mobile after add');
  await mobile.screenshot({ path: outputDir + '/04-mobile-after-add.png', fullPage: true });
  assert.deepEqual(mobileErrors, [], 'Unexpected mobile browser errors: ' + mobileErrors.join('; '));

  await desktop.close();
  await mobile.close();
  console.log('PASS: desktop listing, toggle, create, filtering, deletion, empty state, reload, validation, keyboard focus and mobile interactions.');
}

try {
  await run();
} finally {
  await browser.close();
}
