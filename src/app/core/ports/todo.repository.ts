import { Observable } from 'rxjs';
import { NewTodo, Todo } from '../domain/todo.model';

export abstract class TodoRepository {
  abstract watchAll(): Observable<readonly Todo[]>;
  abstract findById(id: number): Observable<Todo | undefined>;
  abstract create(input: NewTodo): Observable<Todo>;
  abstract update(todo: Todo): Observable<Todo>;
  abstract delete(id: number): Observable<void>;
}
