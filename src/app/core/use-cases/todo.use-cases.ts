import { Observable, switchMap, throwError } from 'rxjs';
import { NewTodo, normalizeTodo, Todo } from '../domain/todo.model';
import { TodoRepository } from '../ports/todo.repository';

// This application layer has no Angular imports and no HTTP knowledge.
export class TodoUseCases {
  constructor(private readonly repository: TodoRepository) {}

  list(): Observable<readonly Todo[]> {
    return this.repository.watchAll();
  }

  create(input: NewTodo): Observable<Todo> {
    try {
      return this.repository.create(normalizeTodo(input));
    } catch (error) {
      return throwError(() => error);
    }
  }

  toggle(id: number): Observable<Todo> {
    return this.repository.findById(id).pipe(
      switchMap(todo => todo
        ? this.repository.update({ ...todo, completed: !todo.completed })
        : throwError(() => new Error('Task not found.'))
      )
    );
  }

  remove(id: number): Observable<void> {
    return this.repository.delete(id);
  }
}
