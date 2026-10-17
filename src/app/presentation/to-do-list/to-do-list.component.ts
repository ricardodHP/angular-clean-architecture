import { Component, OnInit } from '@angular/core';
import { ToDoListUsesCases } from '../../core/usescases/to-do-list-uses-cases';
import { ToDoListModel } from '../../core/domain/to-do-list.model';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  items: ToDoListModel[] = [];
  filteredItems: ToDoListModel[] = [];
  searchTerm = '';
  loading = true;
  errorMessage = '';

  constructor(private readonly useCases: ToDoListUsesCases) {}

  ngOnInit(): void {
    this.useCases.findAllTodo().subscribe({
      next: items => {
        this.items = items;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load tasks. Please try again later.';
        this.loading = false;
      }
    });
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilter();
  }

  trackByTodoId(_index: number, todo: ToDoListModel): number {
    return todo.id;
  }

  private applyFilter(): void {
    const query = this.searchTerm.trim().toLowerCase();
    this.filteredItems = this.items.filter(item =>
      `${item.name} ${item.title}`.toLowerCase().includes(query)
    );
  }
}
