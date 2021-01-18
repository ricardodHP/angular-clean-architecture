import {Component, OnInit} from '@angular/core';
import {ToDoListUsesCases} from '../../core/usescases/to-do-list-uses-cases';
import {Utils} from '../../sys/utils/utils';
import {ToDoListModel} from '../../core/domain/to-do-list.model';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  htmlTable: string;
  items: Array<ToDoListModel>;

  constructor(private toDoListUsesCases: ToDoListUsesCases,
              private utils: Utils) {
  }

  ngOnInit(): void {
    this.toDoListUsesCases.findAllTodo().subscribe(response => {
      console.log(response);
      this.items = [];
      this.items.push(response);

      const tableTitles = ['id', 'Name', 'Title', 'Completed', 'Actions'];
      const tableColumns = ['id', 'name', 'title', 'completed', 'custom-column'];
      this.htmlTable = this.utils.drawTable(false, '', tableTitles, tableColumns, this.items);
    });
  }

}
