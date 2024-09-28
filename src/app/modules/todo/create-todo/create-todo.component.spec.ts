import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {
  CreateTodoComponent,
  uniqueNamesValidator,
} from './create-todo.component';
import { appStore } from '../../../store/store';

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot(appStore),
        CreateTodoComponent,
      ],
    });
    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.todoForm;
    expect(form).toBeDefined();
    expect(form.get('name')?.value).toBe('');
    expect(form.get('deadline')?.value).toBe('');
    expect(form.get('success')?.value).toBe(false);
    expect(component.responsables.length).toBe(1);
  });

  it('should add a new responsible', () => {
    component.addResponsible();
    expect(component.responsables.length).toBe(2);
  });

  it('should remove a responsible', () => {
    component.addResponsible();
    component.removeResponsible(0);
    expect(component.responsables.length).toBe(1);
  });

  it('should add a new skill to a responsible', () => {
    component.addSkill(0);
    expect(component.skills(0).length).toBe(2);
  });

  it('should remove a skill from a responsible', () => {
    component.addSkill(0);
    component.removeSkill(0, 0);
    expect(component.skills(0).length).toBe(1);
  });

  it('should validate unique names for responsibles', () => {
    const formArray = component.responsables;
    formArray.at(0).get('fullName')?.setValue('John Doe');
    component.addResponsible();
    formArray.at(1).get('fullName')?.setValue('John Doe');
    expect(uniqueNamesValidator(formArray)).toEqual({ duplicateNames: true });
  });

  it('should dispatch addTodo action when form is valid', () => {
    spyOn(component['store'], 'dispatch');
    component.todoForm.setValue({
      name: 'Test Todo',
      deadline: '',
      responsibles: [
        {
          fullName: 'John Doe',
          age: 30,
          skills: [{ skill: 'Programming' }],
        },
      ],
      success: false,
    });
    component.createTask();
    expect(component['store'].dispatch).toHaveBeenCalled();
  });

  it('should not dispatch addTodo action when form is invalid', () => {
    spyOn(component['store'], 'dispatch');
    component.createTask();
    expect(component['store'].dispatch).not.toHaveBeenCalled();
  });
});
