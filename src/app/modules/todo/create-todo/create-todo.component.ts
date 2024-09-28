import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../../../store/todo.model';
import * as TodoActions from '../../../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private store = inject(Store<AppState>);
  private router = inject(Router);

  public todoForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    deadline: [''],
    responsibles: this.fb.array([this.newResponsible()], uniqueNamesValidator),
    success: [false],
  });

  newResponsible() {
    return this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: [0, [Validators.required, Validators.min(18), Validators.max(99)]],
      skills: this.fb.array([this.newSkill()]),
    });
  }

  addResponsible() {
    this.responsables.push(this.newResponsible());
  }

  removeResponsible(index: number) {
    this.responsables.removeAt(index);
  }

  newSkill(skill: string = '') {
    return this.fb.group({
      skill: [skill, Validators.required],
    });
  }

  removeSkill(responsableIndex: number, skillIndex: number) {
    this.skills(responsableIndex).removeAt(skillIndex);
  }

  addSkill(indexPeople: number, indexSkill: number | null = null) {
    if (indexSkill !== null) {
      const skill = this.skills(indexPeople).at(indexSkill);
      this.skills(indexPeople).push(this.newSkill(skill.value.skill));
      skill.reset();
      return;
    }
    this.skills(indexPeople).push(this.newSkill());
  }

  get responsables(): FormArray {
    return this.todoForm.get('responsibles') as FormArray;
  }

  skills(index: number): FormArray {
    return this.todoForm.controls.responsibles
      .at(index)
      .get('skills') as FormArray;
  }

  getError(path: string | string[], error: string) {
    const control = this.todoForm.get(path);
    return control?.getError(error) && control.touched;
  }

  getArrayError(
    abstractControl: AbstractControl,
    path: string | string[],
    error: string,
  ) {
    const control = abstractControl.get(path);
    return control?.getError(error) && control.touched;
  }

  createTask() {
    this.todoForm.markAllAsTouched();
    if (this.todoForm.invalid) {
      if (this.todoForm.controls.responsibles.errors) {
        alert('Hay responsables duplicados');
      }
      return;
    }

    const todo: Todo = this.todoForm.value as Todo;
    this.store.dispatch(
      TodoActions.addTodo({
        todo: { ...todo, id: uuidv4() },
      }),
    );
    this.router.navigate(['/']);
  }
}

export const uniqueNamesValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  if (!(control instanceof FormArray)) {
    return null;
  }

  const names = control.controls.map(
    (c) => c.value?.fullName?.toLowerCase().trim(),
  );
  const nameSet = new Set(names);

  if (names.length !== nameSet.size) {
    return { duplicateNames: true };
  }

  return null;
};
