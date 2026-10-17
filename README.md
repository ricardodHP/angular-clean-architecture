# Angular Clean Architecture — To-do List

A small Angular application demonstrating repository abstractions and separation between presentation, use cases, domain models, and data adapters.

Originally created in **January 2021** with Angular 11. Its history is intentionally preserved so the evolution of the architecture can be reviewed.

> **Modernization in progress.** This branch contains the first compatibility refactor, **not yet Angular 22**. Angular 11 is out of support. The framework upgrade, lockfile regeneration and full test run are still pending.

## Current structure

- `src/app/core/domain` — To-do model
- `src/app/core/repositories` — Repository contract
- `src/app/core/usescases` — Application operations
- `src/app/data` — HTTP repository and DTO mapper
- `src/app/presentation` — Angular component and declarative template

The presentation calls use cases, which depend on a repository contract. The HTTP adapter implements that contract.

## Changes in the first modernization step

- Replaced manual HTML string generation and `[innerHTML]` with Angular's `*ngFor` and data bindings.
- Removed the legacy `drawTable()` utility.
- Removed Bootstrap and jQuery as direct dependencies (the lockfile will be regenerated during framework migration).
- Corrected `findAllTodo()` to return `Observable<ToDoListModel[]>`.
- Added loading, empty, error and basic filtering states.
- Added focused component and HTTP repository tests.

## Limitations

- The Angular CLI and testing stack are still the original 2021 versions.
- The configured HTTP API is external and has not been verified; a self-contained demo adapter is planned.
- Remaining CRUD cases are not connected to the UI.
- The use-case layer currently delegates operations and will be reviewed for meaningful application rules.
- The project has **not yet been built or tested** in the modernization environment.

See [modernization plan](docs/MODERNIZATION.md).

## Historical code

The `main` branch retains the original Angular 11 source until the modernization is reviewed and merged.
