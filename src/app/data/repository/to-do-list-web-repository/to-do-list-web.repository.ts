import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToDoListRepository } from '../../../core/repositories/to-do-list-repository';
import { ToDoListModel } from '../../../core/domain/to-do-list.model';
import { Response } from '../../../core/common/response';
import { environment } from '../../../../environments/environment';
import { ToDoListWebEntity } from './to-do-list-web-entity';
import { ToDoListWebRepositoryMapper } from './to-do-list-web-repository-mapper';

@Injectable({ providedIn: 'root' })
export class ToDoListWebRepository extends ToDoListRepository {
  private readonly mapper = new ToDoListWebRepositoryMapper();

  constructor(private readonly http: HttpClient) {
    super();
  }

  createTodoItem(body: ToDoListModel): Observable<Response> {
    return this.http.post<Response>(environment.apiUrl + '/todo', body);
  }

  deleteTodoItem(id: number): Observable<Response> {
    return this.http.delete<Response>(environment.apiUrl + `/todo/${id}`);
  }

  findAllTodo(): Observable<ToDoListModel[]> {
    return this.http.get<ToDoListWebEntity[]>(environment.apiUrl + '/todo').pipe(
      map(items => items.map(item => this.mapper.mapFrom(item)))
    );
  }

  getTodoItemDetail(id: number): Observable<ToDoListModel> {
    return this.http.get<ToDoListWebEntity>(environment.apiUrl + `/todo/${id}`).pipe(
      map(item => this.mapper.mapFrom(item))
    );
  }

  updateTodoItem(id: number, body: ToDoListModel): Observable<Response> {
    return this.http.put<Response>(environment.apiUrl + `/todo/${id}`, body);
  }

  updateTodoItemStatus(id: number, body: ToDoListModel): Observable<Response> {
    return this.http.patch<Response>(environment.apiUrl + `/todo/${id}`, body);
  }
}
