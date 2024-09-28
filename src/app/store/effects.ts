import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as TodoActions from './actions';
import { TodoService } from './todo.service';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private todoService = inject(TodoService);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoService.getAll().pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) =>
            of(TodoActions.loadTodosFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
