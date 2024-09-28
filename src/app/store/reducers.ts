import { createReducer, on } from '@ngrx/store';
import { Todo } from './todo.model';
import * as TodoActions from './actions';

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string;
}
export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: '',
};
export const todoReducer = createReducer(
  initialState,

  on(TodoActions.loadTodos, (state) => ({ ...state, loading: true })),

  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
  })),

  on(TodoActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(TodoActions.addTodo, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),

  on(TodoActions.updateTodo, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
  })),

  on(TodoActions.deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((t) => t.id !== id),
  })),
);
