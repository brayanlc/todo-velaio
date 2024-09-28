import { createSelector } from '@ngrx/store';
import { Todo } from './todo.model';
import { AppState } from './store';

export const selectAllTodos = (state: AppState) => state.todo.todos;

export const selectTodos = createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos,
);

export const selectTodoSuccess = createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.filter((todo) => todo.success),
);

export const selectTodoPending = createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.filter((todo) => !todo.success),
);
