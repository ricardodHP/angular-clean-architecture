import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ToDoListWebRepository } from './to-do-list-web.repository';
import { environment } from '../../../../environments/environment';

describe('ToDoListWebRepository', () => {
  let repository: ToDoListWebRepository;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    repository = TestBed.inject(ToDoListWebRepository);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('returns a collection, not one emission per item', () => {
    let received: unknown;

    repository.findAllTodo().subscribe(items => received = items);
    const request = http.expectOne(environment.apiUrl + '/todo');
    request.expect('GET');
    request.flush([
      { id: 1, name: 'Home', title: 'Buy groceries', completed: false },
      { id: 2, name: 'Work', title: 'Review PR', completed: true }
    ]);

    expect(received).toEqual([
      { id: 1, name: 'Home', title: 'Buy groceries', completed: false },
      { id: 2, name: 'Work', title: 'Review PR', completed: true }
    ]);
  });
});
