import {Observable} from 'rxjs';
import {ToDoListModel} from '../domain/to-do-list.model';
import {Response} from '../common/response';

export abstract class ToDoListRepository {
  abstract createTodoItem(body: ToDoListModel): Observable<Response>;

  abstract getTodoItemDetail(id: number): Observable<ToDoListModel>;

  abstract findAllTodo(): Observable<ToDoListModel>;

  abstract updateTodoItem(id: number, body: ToDoListModel): Observable<Response>;

  abstract updateTodoItemStatus(id: number, body: ToDoListModel): Observable<Response>;

  abstract deleteTodoItem(id: number): Observable<Response>;
}
