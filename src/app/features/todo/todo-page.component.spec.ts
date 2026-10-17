import { TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { appConfig } from '../../app.config';
import { TodoPageComponent } from './todo-page.component';

describe('TodoPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoPageComponent],
      providers: appConfig.providers
    }).compileComponents();
  });

  it('renders the seeded tasks', async () => {
    const fixture = TestBed.createComponent(TodoPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelectorAll('.todo-row').length).toBe(3);
    expect(fixture.nativeElement.textContent).toContain('Write unit tests');
  });

  it('filters tasks through a signal', async () => {
    const fixture = TestBed.createComponent(TodoPageComponent);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('#search');
    input.value = 'architecture';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.todo-row').length).toBe(1);
  });
});
