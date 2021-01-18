import {Injectable} from '@angular/core';
import {ToDoListRepository} from '../repositories/to-do-list-repository';
import {Observable} from 'rxjs';
import {Response} from '../common/response';
import {ToDoListModel} from '../domain/to-do-list.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoListUsesCases {
  constructor(private toDoListRepository: ToDoListRepository) {
  }

  createTodoItem(body: ToDoListModel): Observable<Response> {
    return this.toDoListRepository.createTodoItem(body);
  }

  getTodoItemDetail(id: number): Observable<ToDoListModel> {
    return this.toDoListRepository.getTodoItemDetail(id);
  }

  findAllTodo(): Observable<ToDoListModel> {
    return this.toDoListRepository.findAllTodo();
  }

  updateTodoItem(id: number, body: ToDoListModel): Observable<Response> {
    return this.toDoListRepository.updateTodoItem(id, body);
  }

  updateTodoItemStatus(id: number, body: ToDoListModel): Observable<Response> {
    return this.toDoListRepository.updateTodoItemStatus(id, body);
  }

  deleteTodoItem(id: number): Observable<Response> {
    return this.toDoListRepository.deleteTodoItem(id);
  }
}
