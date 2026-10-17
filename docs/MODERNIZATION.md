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

\`\`\`text
Presentation (Angular component)
   -> Application (use cases)
      -> Port (TodoRepository) -> Domain (Todo)
         ^
         |
      Data adapter (InMemoryTodoRepository)
\`\`\`

The arrows in this diagram represent source-code dependencies, not runtime call direction.

## Why an in-memory adapter?

The 2021 app used a third-party endpoint in development and a localhost endpoint in production. A public educational example should not rely on either. Swapping the adapter in the composition root also demonstrates dependency inversion.

## Deliberate limits

- No NgRx: local component Signals are sufficient.
- No API, database, authentication or persistence: this is a small architecture example.
- No mapper until the input and persistence schemas actually differ.
- No Angular dependency in core domain or use-case logic.
- No use case class per CRUD operation.
- No business rule for every single repository function.
- Not a migration recipe from Angular 11 directly to 22 for production systems; this is a clean rebuild retaining the historical business scope and Git history.

## Next gates

- [ ] Verify npm dependency installation and regenerate lockfile.
- [ ] Verify production build and all tests in GitHub Actions.
- [ ] Switch CI to npm ci once lockfile is committed.
- [ ] Review mobile layout and basic keyboard accessibility.
- [ ] Add test cases for deletion, filtering empty states and failed repository mutations.
- [ ] Write a LinkedIn post that accurately contrasts the 2021 code and the 2026 decisions.
