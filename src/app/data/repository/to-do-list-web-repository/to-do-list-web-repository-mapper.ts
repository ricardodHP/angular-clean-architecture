import {Mapper} from '../../../core/base/mapper';
import {ToDoListWebEntity} from './to-do-list-web-entity';
import {ToDoListModel} from '../../../core/domain/to-do-list.model';

export class ToDoListWebRepositoryMapper extends Mapper<ToDoListWebEntity, ToDoListModel> {
  mapFrom(param: ToDoListWebEntity): ToDoListModel {
    return {
      id: param.id,
      name: param.name,
      title: param.title,
      completed: param.completed
    };
  }

  mapTo(param: ToDoListModel): ToDoListWebEntity {
    return {
      id: 0,
      name: param.name,
      title: param.title,
      completed: param.completed
    };
  }
}
