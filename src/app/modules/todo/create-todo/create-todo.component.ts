import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  private fb: FormBuilder = inject(FormBuilder);

  public todoForm = this.fb.group({
    name: ['', Validators.required],
    deadline: ['', Validators.required],
    responsables: this.fb.array([this.newResponsible()]),
  });

  newResponsible() {
    return this.fb.group({
      fullName: ['', Validators.required],
      age: ['', Validators.required],
      skills: this.fb.array([this.newSkill()]),
    });
  }

  addResponsible() {
    this.responsables.push(this.newResponsible());
  }

  removeResponsible(index: number) {
    this.responsables.removeAt(index);
  }

  newSkill() {
    return this.fb.group({
      description: ['', Validators.required],
    });
  }

  removeSkill(responsableIndex: number, skillIndex: number) {
    this.skills(responsableIndex).removeAt(skillIndex);
  }

  addSkill(index: number) {
    this.skills(index).push(this.newSkill());
  }

  get responsables(): FormArray {
    return this.todoForm.get('responsables') as FormArray;
  }

  skills(index: number): FormArray {
    return this.todoForm.controls.responsables
      .at(index)
      .get('skills') as FormArray;
  }

  createTask() {
    console.log(this.todoForm.value);
  }
}
