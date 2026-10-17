import { describe, expect, it } from 'vitest';
import { normalizeTodo } from './todo.model';

describe('normalizeTodo', () => {
  it('trims both fields', () => {
    expect(normalizeTodo({ name: '  Work ', title: ' Write tests  ' })).toEqual({
      name: 'Work', title: 'Write tests'
    });
  });

  it('rejects blank titles', () => {
    expect(() => normalizeTodo({ name: 'Work', title: '   ' })).toThrow('required');
  });

  it('rejects overlong fields', () => {
    expect(() => normalizeTodo({ name: 'Work', title: 'a'.repeat(121) })).toThrow('too long');
  });
});
