export interface Todo {
  readonly id: number;
  readonly name: string;
  readonly title: string;
  readonly completed: boolean;
}

export type NewTodo = Pick<Todo, 'name' | 'title'>;

export function normalizeTodo(input: NewTodo): NewTodo {
  const name = input.name.trim();
  const title = input.title.trim();

  if (!name || !title) {
    throw new Error('Both a category and a task title are required.');
  }
  if (name.length > 40 || title.length > 120) {
    throw new Error('Category or task title is too long.');
  }

  return { name, title };
}
