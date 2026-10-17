import { ApplicationConfig } from '@angular/core';
import { TodoRepository } from './core/ports/todo.repository';
import { TodoUseCases } from './core/use-cases/todo.use-cases';
import { InMemoryTodoRepository } from './data/in-memory-todo.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: TodoRepository, useClass: InMemoryTodoRepository },
    {
      provide: TodoUseCases,
      useFactory: (repository: TodoRepository) => new TodoUseCases(repository),
      deps: [TodoRepository]
    }
  ]
};
