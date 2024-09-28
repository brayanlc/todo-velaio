import { todoReducer, TodoState } from './reducers';
import { Action, ActionReducer } from '@ngrx/store';
import { TodoEffects } from './effects';

export interface AppState {
  todo: TodoState;
}

export interface AppStore {
  todo: ActionReducer<TodoState, Action>;
}

export const appStore: AppStore = {
  todo: todoReducer,
};

export const appEffects = [TodoEffects];
