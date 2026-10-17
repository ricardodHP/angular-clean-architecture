# Architecture modernization notes

## What changed

| 2021 Angular 11 | 2026 Angular 22 |
| --- | --- |
| NgModules and module bootstrap | Standalone components and bootstrapApplication |
| HTML generated as strings through drawTable() | Declarative templates with @if / @for |
| jQuery and Bootstrap | Plain CSS |
| Observable<Todo> from list query | Observable<readonly Todo[]> repository stream |
| Angular service use-cases that mirror CRUD methods | Plain TypeScript application service with input validation and status transition |
| HTTP adapter tied to an old mock API | In-memory adapter behind a repository contract |
| Karma / Jasmine / Protractor / TSLint | Vitest and Angular testing utilities |
| Zone.js-based change detection | Angular zoneless defaults |

## Dependency direction

```text
Presentation (Angular component)
   -> Application (use cases)
      -> Port (TodoRepository) -> Domain (Todo)
         ^
         |
      Data adapter (InMemoryTodoRepository)
```

The arrows indicate source-code dependencies, not runtime call direction.

## Why an in-memory adapter?

The 2021 app used a third-party endpoint in development and a localhost endpoint in production. A public educational example should not rely on either. Swapping the adapter in the composition root also demonstrates dependency inversion.

## Deliberate limits

- No NgRx: local component Signals are sufficient.
- No API, database, authentication or persistence: this is a small architecture example.
- No mapper until input and persistence schemas differ.
- No Angular dependency in core domain or use-case logic.
- No use case class per CRUD operation.
- No business rule for every single repository function.
- Not a migration recipe from Angular 11 directly to 22 for production systems; this is a clean rebuild retaining the historical business scope and Git history.

## Validation

- [x] Angular 22 dependencies installed and locked.
- [x] GitHub Actions production build passed (initial validation).
- [x] Domain, use case, and component tests passed (initial validation).
- [x] GitHub Actions configured for npm ci.
- [x] npm ci, production build and 14/14 tests passed in GitHub Actions.
- [x] Browser interaction tests and screenshot review at 1440 px desktop and 390 px mobile; no horizontal overflow.
- [x] Basic keyboard navigation and native form validation tested in Chromium.
- [x] Reject and display whitespace-only title errors in the UI.
- [ ] Add failure-path tests for asynchronous repository mutations and screen-reader review.
- [x] Automated axe-core WCAG 2 A/AA and WCAG 2.1 AA rule audit reported zero violations on desktop and mobile; manually rechecked the low-contrast completed title styling.
- [ ] Write LinkedIn Before/After post from actual, reviewed code.

The PR is kept as a draft until the remaining gates pass.

Validation sources: [latest build and unit tests](https://github.com/ricardodHP/angular-clean-architecture/actions/runs/39003793264), [browser smoke test and screenshots](https://github.com/ricardodHP/angular-clean-architecture/actions/runs/39003793251).

Note: zero automated axe-core violations do not establish full accessibility conformance; a human screen-reader evaluation is outside this pass.
