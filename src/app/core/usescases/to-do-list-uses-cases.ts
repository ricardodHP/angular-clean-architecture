import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../common/response';
import { ToDoListModel } from '../domain/to-do-list.model';
import { ToDoListRepository } from '../repositories/to-do-list-repository';

@Injectable({ providedIn: 'root' })
export class ToDoListUsesCases {
  constructor(private readonly repository: ToDoListRepository) {}

  createTodoItem(body: ToDoListModel): Observable<Response> {
    return this.repository.createTodoItem(body);
  }

  getTodoItemDetail(id: number): Observable<ToDoListModel> {
    return this.repository.getTodoItemDetail(id);
  }

  findAllTodo(): Observable<ToDoListModel[]> {
    return this.repository.findAllTodo();
  }

  updateTodoItem(id: number, body: ToDoListModel): Observable<Response> {
    return this.repository.updateTodoItem(id, body);
  }

  updateTodoItemStatus(id: number, body: ToDoListModel): Observable<Response> {
    return this.repository.updateTodoItemStatus(id, body);
  }

  deleteTodoItem(id: number): Observable<Response> {
    return this.repository.deleteTodoItem(id);
  }
}
