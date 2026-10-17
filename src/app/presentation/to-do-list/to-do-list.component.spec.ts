import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ToDoListUsesCases } from '../../core/usescases/to-do-list-uses-cases';
import { ToDoListModel } from '../../core/domain/to-do-list.model';
import { ToDoListComponent } from './to-do-list.component';

describe('ToDoListComponent', () => {
  let fixture: ComponentFixture<ToDoListComponent>;
  let useCases: jasmine.SpyObj<ToDoListUsesCases>;

  const todos: ToDoListModel[] = [
    { id: 1, name: 'Home', title: 'Buy groceries', completed: false },
    { id: 2, name: 'Work', title: 'Review PR', completed: true }
  ];

  beforeEach(async () => {
    useCases = jasmine.createSpyObj('ToDoListUsesCases', ['findAllTodo']);
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ToDoListComponent],
      providers: [{ provide: ToDoListUsesCases, useValue: useCases }]
    }).compileComponents();
  });

  it('renders a row for each task', () => {
    useCases.findAllTodo.and.returnValue(of(todos));
    fixture = TestBed.createComponent(ToDoListComponent);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('Buy groceries');
  });

  it('filters tasks by title without building HTML strings', () => {
    useCases.findAllTodo.and.returnValue(of(todos));
    fixture = TestBed.createComponent(ToDoListComponent);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('#task-search');
    input.value = 'groceries';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Buy groceries');
  });

  it('shows an error state when loading fails', () => {
    useCases.findAllTodo.and.returnValue(throwError(new Error('Network error')));
    fixture = TestBed.createComponent(ToDoListComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(0);
  });
});
