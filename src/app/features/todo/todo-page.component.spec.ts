import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { appConfig } from '../../app.config';
import { TodoPageComponent } from './todo-page.component';

describe('TodoPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoPageComponent],
      providers: appConfig.providers
    }).compileComponents();
  });

  it('renders the seeded tasks', async () => {
    const fixture = TestBed.createComponent(TodoPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelectorAll('.todo-row').length).toBe(3);
    expect(fixture.nativeElement.textContent).toContain('Write unit tests');
  });

  it('filters tasks through a signal', async () => {
    const fixture = TestBed.createComponent(TodoPageComponent);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('#search');
    input.value = 'architecture';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.todo-row').length).toBe(1);
  });

  it('shows a useful empty state for a search with no matches', async () => {
    const fixture = TestBed.createComponent(TodoPageComponent);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('#search');
    input.value = 'something-that-is-not-here';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelectorAll('.todo-row').length).toBe(0);
    expect(fixture.nativeElement.textContent).toContain('No tasks match your search.');
  });

  it('creates a task using the form without directly accessing a repository', async () => {
    const fixture = TestBed.createComponent(TodoPageComponent);
    fixture.detectChanges();

    const category: HTMLInputElement = fixture.nativeElement.querySelector('#category');
    const title: HTMLInputElement = fixture.nativeElement.querySelector('#task-title');
    category.value = 'Home';
    title.value = 'Clean the desk';
    category.dispatchEvent(new Event('input'));
    title.dispatchEvent(new Event('input'));

    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelectorAll('.todo-row').length).toBe(4);
    expect(fixture.nativeElement.textContent).toContain('Clean the desk');
  });

  it('removes a task through its action button', async () => {
    const fixture = TestBed.createComponent(TodoPageComponent);
    fixture.detectChanges();

    const remove: HTMLButtonElement = fixture.nativeElement.querySelector('.todo-row .remove');
    remove.click();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelectorAll('.todo-row').length).toBe(2);
    expect(fixture.nativeElement.textContent).not.toContain('Review the architecture diagram');
  });
});
