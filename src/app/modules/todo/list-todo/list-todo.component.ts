import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../store/store';
import { Store } from '@ngrx/store';
import { Todo } from '../../../store/todo.model';
import { Observable } from 'rxjs';
import * as TodoActions from '../../../store/actions';
import {
  selectTodoPending,
  selectTodos,
  selectTodoSuccess,
} from '../../../store/selectors';

@Component({
  selector: 'app-list-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss'],
})
export class ListTodoComponent {
  private store = inject(Store<AppState>);

  todos$: Observable<Todo[]>;

  constructor() {
    this.todos$ = this.store.select(selectTodos);
  }

  successTasks() {
    this.todos$ = this.store.select(selectTodoSuccess);
  }

  pendingTasks() {
    this.todos$ = this.store.select(selectTodoPending);
  }

  allTasks() {
    this.todos$ = this.store.select(selectTodos);
  }

  toggleTodoSuccess(todo: Todo) {
    this.store.dispatch(
      TodoActions.updateTodo({ todo: { ...todo, success: !todo.success } }),
    );
  }

  loadTodos() {
    this.store.dispatch(TodoActions.loadTodos());
  }
}
