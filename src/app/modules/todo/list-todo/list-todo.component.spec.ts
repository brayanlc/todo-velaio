import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ListTodoComponent } from './list-todo.component';
import { AppState } from '../../../store/store';
import { Todo } from '../../../store/todo.model';
import * as TodoActions from '../../../store/actions';
import {
  selectTodos,
  selectTodoPending,
  selectTodoSuccess,
} from '../../../store/selectors';
import { By } from '@angular/platform-browser';

describe('ListTodoComponent', () => {
  let component: ListTodoComponent;
  let fixture: ComponentFixture<ListTodoComponent>;
  let store: MockStore<AppState>;
  const initialState: AppState = {
    todo: {
      todos: [],
      loading: false,
      error: '',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListTodoComponent],
      providers: [provideMockStore({ initialState })],
    });

    fixture = TestBed.createComponent(ListTodoComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', () => {
    spyOn(store, 'dispatch');
    component.loadTodos();
    expect(store.dispatch).toHaveBeenCalledWith(TodoActions.loadTodos());
  });

  it('should select all todos', () => {
    const todos: Todo[] = [
      {
        id: '1',
        name: 'Test Todo',
        success: false,
        deadline: '2021-12-31',
        responsibles: [],
      },
    ];
    store.overrideSelector(selectTodos, todos);
    component.allTasks();
    component.todos$.subscribe((result) => {
      expect(result).toEqual(todos);
    });
  });

  it('should select success todos', () => {
    const todos: Todo[] = [
      {
        id: '1',
        name: 'Test Todo',
        success: true,
        deadline: '2021-12-31',
        responsibles: [],
      },
    ];
    store.overrideSelector(selectTodoSuccess, todos);
    component.successTasks();
    component.todos$.subscribe((result) => {
      expect(result).toEqual(todos);
    });
  });

  it('should select pending todos', () => {
    const todos: Todo[] = [
      {
        id: '1',
        name: 'Test Todo',
        success: false,
        deadline: '2021-12-31',
        responsibles: [],
      },
    ];
    store.overrideSelector(selectTodoPending, todos);
    component.pendingTasks();
    component.todos$.subscribe((result) => {
      expect(result).toEqual(todos);
    });
  });

  it('should toggle todo success status', () => {
    spyOn(store, 'dispatch');
    const todo: Todo = {
      id: '1',
      name: 'Test Todo',
      success: false,
      deadline: '2021-12-31',
      responsibles: [],
    };
    component.toggleTodoSuccess(todo);
    expect(store.dispatch).toHaveBeenCalledWith(
      TodoActions.updateTodo({
        todo: { ...todo, success: !todo.success },
      }),
    );
  });
});
