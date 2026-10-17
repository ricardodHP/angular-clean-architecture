import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Todo } from '../../core/domain/todo.model';
import { TodoUseCases } from '../../core/use-cases/todo.use-cases';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoPageComponent implements OnInit {
  private readonly useCases = inject(TodoUseCases);
  private readonly destroyRef = inject(DestroyRef);

  readonly todos = signal<readonly Todo[]>([]);
  readonly searchTerm = signal('');
  readonly newName = signal('');
  readonly newTitle = signal('');
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly filteredTodos = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.todos().filter(todo =>
      (todo.name + ' ' + todo.title).toLowerCase().includes(term)
    );
  });
  readonly pendingCount = computed(() => this.todos().filter(todo => !todo.completed).length);

  ngOnInit(): void {
    this.useCases.list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: todos => {
          this.todos.set(todos);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Unable to load tasks.');
          this.loading.set(false);
        }
      });
  }

  addTodo(event: Event): void {
    event.preventDefault();
    this.error.set(null);
    this.useCases.create({ name: this.newName(), title: this.newTitle() }).subscribe({
      next: () => {
        this.newName.set('');
        this.newTitle.set('');
      },
      error: error => this.error.set(error instanceof Error ? error.message : 'Unable to create task.')
    });
  }

  toggleTodo(id: number): void {
    this.error.set(null);
    this.useCases.toggle(id).subscribe({
      error: () => this.error.set('Unable to update task.')
    });
  }

  removeTodo(id: number): void {
    this.error.set(null);
    this.useCases.remove(id).subscribe({
      error: () => this.error.set('Unable to remove task.')
    });
  }
}
