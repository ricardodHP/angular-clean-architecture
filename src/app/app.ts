import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoPageComponent } from './features/todo/todo-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoPageComponent],
  template: '<app-todo-page />',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
