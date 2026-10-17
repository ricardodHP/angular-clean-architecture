import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { NewTodo, Todo } from '../core/domain/todo.model';
import { TodoRepository } from '../core/ports/todo.repository';

const SEED_TASKS: readonly Todo[] = [
  { id: 1, name: 'Personal', title: 'Review the architecture diagram', completed: true },
  { id: 2, name: 'Learning', title: 'Write unit tests for use cases', completed: false },
  { id: 3, name: 'Work', title: 'Document repository trade-offs', completed: false }
];

@Injectable()
export class InMemoryTodoRepository extends TodoRepository {
  private readonly tasks = new BehaviorSubject<readonly Todo[]>(SEED_TASKS);
  private nextId = 4;

  watchAll(): Observable<readonly Todo[]> {
    return this.tasks.asObservable();
  }

  findById(id: number): Observable<Todo | undefined> {
    return of(this.tasks.value.find(todo => todo.id === id));
  }

  create(input: NewTodo): Observable<Todo> {
    const todo: Todo = { id: this.nextId++, ...input, completed: false };
    this.tasks.next([...this.tasks.value, todo]);
    return of(todo);
  }

  update(todo: Todo): Observable<Todo> {
    if (!this.tasks.value.some(item => item.id === todo.id)) {
      return throwError(() => new Error('Task not found.'));
    }
    this.tasks.next(this.tasks.value.map(item => item.id === todo.id ? todo : item));
    return of(todo);
  }

  delete(id: number): Observable<void> {
    if (!this.tasks.value.some(todo => todo.id === id)) {
      return throwError(() => new Error('Task not found.'));
    }
    this.tasks.next(this.tasks.value.filter(todo => todo.id !== id));
    return of(undefined);
  }
}
