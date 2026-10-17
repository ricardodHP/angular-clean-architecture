# Modernization plan — Angular Clean Architecture

## Purpose

Keep the 2021 To-do List as a small, reviewable example of how engineering decisions evolve. Avoid making the example complex merely to showcase patterns.

## Decisions

- Preserve Git history and keep `main` untouched until review.
- Retain the To-do domain and repository abstraction.
- Eliminate HTML-string generation, `[innerHTML]`, jQuery and Bootstrap 4.
- Separate the compatibility cleanup from the Angular 22 migration.
- Prefer standalone components, declarative control flow and focused Signals after upgrading.
- Keep RxJS for asynchronous boundaries; do not force Signals everywhere.
- Introduce a self-contained demo adapter before relying on any remote backend.
- Include meaningful tests of dependency direction, mapping and application behavior.
- Avoid NgRx, CQRS, event buses, feature flags and new dependencies without a demonstrated need.

## Phase 1 — Cleanup on Angular 11

- [x] Replace `drawTable()` with declarative Angular templates.
- [x] Return `Observable<ToDoListModel[]>` for list query.
- [x] Remove direct Bootstrap and jQuery dependencies from `package.json`.
- [x] Add component and repository tests.
- [ ] Run installs/builds/tests under a compatible historical Node environment.
- [ ] Regenerate the lockfile and validate no orphaned packages remain.

## Phase 2 — Framework upgrade

- [ ] Target Angular 22 with a **supported Node version** (22.22.3+, 24.15+ or 26+).
- [ ] Recreate CLI workspace tooling with a reproducible lockfile.
- [ ] Convert NgModules to standalone and HTTP providers.
- [ ] Convert `*ngFor`/`*ngIf` to modern built-in template control flow where clearer.
- [ ] Adopt Signals for UI state only where they simplify the model.
- [ ] Replace deprecated TSLint, Protractor and Karma tooling.
- [ ] Build, lint, and run tests in CI.

## Phase 3 — Architectural improvements

- [ ] Review use-case methods; do not preserve pass-through methods without purpose.
- [ ] Separate domain types from HTTP DTOs only where the boundary matters.
- [ ] Add meaningful application rules (e.g. nonblank task title and status transition).
- [ ] Add an in-memory demo adapter with seeded To-dos.
- [ ] Keep optional HTTP adapter as a replaceable boundary.
- [ ] Exercise CRUD through UI using only supported adapters and validated inputs.
- [ ] Test contracts, mapping, error handling and UI states.

## Phase 4 — Public example

- [ ] Document dependencies and trade-offs in an architecture diagram.
- [ ] Explain 2021 vs 2026 choices, including what was overengineering.
- [ ] Capture verified screenshots and CI results.
- [ ] Prepare a small LinkedIn Before/After example from reviewed code.

## Acceptance criteria

- `npm ci`, build and test succeed on the documented environment.
- No runtime use of jQuery, `drawTable()` or `[innerHTML]`.
- The To-do list loads and filters correctly; CRUD has predictable persistence semantics.
- Core domain abstractions have no imports from infrastructure.
- Tests include successful and failed repository calls.
- The demo runs without a third-party API account.
- No change reaches `main` without review.

## Known review topics

- The old `mapTo()` forces `id: 0`; redesign around creation DTOs.
- The old external API URLs differ between development and production.
- A small To-do app may not justify a use case per CRUD call; demonstrate the trade-off.
