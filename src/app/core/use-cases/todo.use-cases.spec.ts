import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';
import { InMemoryTodoRepository } from '../../data/in-memory-todo.repository';
import { TodoUseCases } from './todo.use-cases';

describe('TodoUseCases', () => {
  it('creates a trimmed task and exposes it through the repository', async () => {
    const useCases = new TodoUseCases(new InMemoryTodoRepository());
    const created = await firstValueFrom(useCases.create({ name: '  Work ', title: ' Write tests ' }));
    const tasks = await firstValueFrom(useCases.list());

    expect(created.name).toBe('Work');
    expect(created.title).toBe('Write tests');
    expect(tasks.some(todo => todo.id === created.id)).toBe(true);
  });

  it('rejects blank titles without mutating the repository', async () => {
    const useCases = new TodoUseCases(new InMemoryTodoRepository());
    await expect(firstValueFrom(useCases.create({ name: 'Work', title: ' ' }))).rejects.toThrow();
    expect((await firstValueFrom(useCases.list())).length).toBe(3);
  });

  it('toggles completion without changing the task identity', async () => {
    const useCases = new TodoUseCases(new InMemoryTodoRepository());
    const changed = await firstValueFrom(useCases.toggle(2));

    expect(changed.id).toBe(2);
    expect(changed.completed).toBe(true);
    expect((await firstValueFrom(useCases.list())).find(todo => todo.id === 2)?.completed).toBe(true);
  });

  it('rejects a missing task when toggling', async () => {
    const useCases = new TodoUseCases(new InMemoryTodoRepository());
    await expect(firstValueFrom(useCases.toggle(999))).rejects.toThrow('Task not found');
  });

  it('removes an existing task', async () => {
    const useCases = new TodoUseCases(new InMemoryTodoRepository());
    await firstValueFrom(useCases.remove(1));

    expect((await firstValueFrom(useCases.list())).map(todo => todo.id)).toEqual([2, 3]);
  });

  it('rejects a removal for a missing task without changing other tasks', async () => {
    const useCases = new TodoUseCases(new InMemoryTodoRepository());
    await expect(firstValueFrom(useCases.remove(999))).rejects.toThrow('Task not found');
    expect((await firstValueFrom(useCases.list())).length).toBe(3);
  });
});
