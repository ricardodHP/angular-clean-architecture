import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ToDoListUsesCases } from './core/usescases/to-do-list-uses-cases';
import { ToDoListComponent } from './presentation/to-do-list/to-do-list.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [AppComponent, ToDoListComponent],
      providers: [{
        provide: ToDoListUsesCases,
        useValue: { findAllTodo: () => of([]) }
      }]
    }).compileComponents();
  });

  it('renders the To-do List', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('To-do List');
  });
});
