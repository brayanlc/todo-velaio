import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  getAll(): Observable<Todo[]> {
    return of([
      {
        id: '1',
        name: 'Create a new project',
        deadline: '2021-12-31',
        success: false,
        responsibles: [
          {
            fullName: 'John Doe',
            age: 30,
            skills: [
              {
                skill: 'Angular',
              },
              {
                skill: 'TypeScript',
              },
            ],
          },
        ],
      },
      {
        id: '2',
        name: 'Create a new component',
        deadline: '2021-12-31',
        success: false,
        responsibles: [
          {
            fullName: 'John Doe',
            age: 30,
            skills: [
              {
                skill: 'Angular',
              },
              {
                skill: 'TypeScript',
              },
            ],
          },
        ],
      },
    ]).pipe(delay(2000));
  }
}
