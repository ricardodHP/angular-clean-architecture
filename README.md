# Angular Clean Architecture — 2026 refresh

A small To-do List demonstrating how to revisit an Angular **11 (2021)** codebase using Angular **22 (2026)** without adding unnecessary architecture.

> **Review status:** Implementation is available in the draft PR. Build and unit tests are run in GitHub Actions; review and browser verification remain necessary before merging to main.

## What the app does

- List seeded tasks, create a task, mark tasks complete/incomplete, delete tasks.
- Filter by title or category.
- Show loading, empty and error states.
- Run without any remote API or API key.

**Data is in memory and resets on page reload.** Persistent storage is intentionally out of scope for this demo.

## Technology

- Angular 22, standalone components, built-in control flow (`@if`, `@for`)
- Signals for presentation state; RxJS for the repository port
- Angular's default zoneless change detection
- Vitest tests with Angular TestBed
- CSS without Bootstrap, jQuery, or a component framework

## Structure

```text
src/app/
  core/
    domain/             Todo entity, input validation
    ports/              Repository abstraction
    use-cases/          Application operations
  data/                 In-memory repository adapter
  features/todo/        UI component and templates
  app.config.ts         Composition root (dependency injection)
```

The dependencies point inward: presentation uses the application layer; the in-memory repository implements an application port. Core classes do not import Angular.

## Getting started

Use **Node 24.15+** or Node 22.22.3+; run `nvm use` if you use nvm.

```bash
npm ci
npm start
npm run build
npm test
```

The lockfile is committed and CI uses `npm ci` for reproducible installs.

## History

- [Original source from January 2021](https://github.com/ricardodHP/angular-clean-architecture/tree/460c4b05bca83fbca2aa38022c52b1384ff6d6cd)
- [Modernization branch](https://github.com/ricardodHP/angular-clean-architecture/tree/modernization/angular-22)
- [Modernization decisions](docs/MODERNIZATION.md)

The goal is not to claim that every small UI needs Clean Architecture. It is to demonstrate dependency inversion and explain when abstractions help or become overhead.
