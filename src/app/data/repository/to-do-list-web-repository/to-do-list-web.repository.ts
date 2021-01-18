import {Injectable} from '@angular/core';
import {ToDoListRepository} from '../../../core/repositories/to-do-list-repository';
import {Observable} from 'rxjs';
import {ToDoListModel} from '../../../core/domain/to-do-list.model';
import {ToDoListWebRepositoryMapper} from './to-do-list-web-repository-mapper';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Response} from '../../../core/common/response';
import {map, mergeMap} from 'rxjs/operators';
import {ToDoListWebEntity} from './to-do-list-web-entity';

@Injectable({
  providedIn: 'root'
})
export class ToDoListWebRepository extends ToDoListRepository {
  mapper = new ToDoListWebRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  createTodoItem = (body: ToDoListModel): Observable<Response> => this.http.post<Response>(environment.apiUrl + '/todo', body);

  deleteTodoItem = (id: number): Observable<Response> => this.http.delete<Response>(environment.apiUrl + `/todo/${id}`);

  findAllTodo = (): Observable<ToDoListModel> => {
    return this.http.get<ToDoListWebEntity[]>(environment.apiUrl + '/todo')
      .pipe(mergeMap(item => item))
      .pipe(map(this.mapper.mapFrom));
  }

  getTodoItemDetail = (id: number): Observable<ToDoListModel> => this.http.get<ToDoListWebEntity>(environment.apiUrl + `/todo/${id}`)
    .pipe(map(this.mapper.mapFrom))

  updateTodoItem = (id: number, body: ToDoListModel): Observable<Response> =>
    this.http.put<Response>(environment.apiUrl + `/todo/${id}`, body)

  updateTodoItemStatus = (id: number, body: ToDoListModel): Observable<Response> =>
    this.http.patch<Response>(environment.apiUrl + `/todo/${id}`, body)

}
