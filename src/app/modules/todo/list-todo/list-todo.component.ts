import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss'],
})
export class ListTodoComponent {
  tasks = [
    {
      id: 1,
      name: 'Tarea A',
      deadline: '2024-10-01',
      success: false,
      responsibles: [
        {
          fullName: 'Juan Pérez',
          age: 25,
          skills: [{ skill: 'JavaScript' }, { skill: 'Angular' }],
        },
        {
          fullName: 'María López',
          age: 30,
          skills: [{ skill: 'TypeScript' }, { skill: 'CSS' }],
        },
      ],
    },
    {
      id: 2,
      name: 'Tarea B',
      deadline: '2024-09-25',
      success: true,
      responsibles: [
        {
          fullName: 'Carlos Gómez',
          age: 40,
          skills: [{ skill: 'HTML' }, { skill: 'SCSS' }],
        },
      ],
    },
    {
      id: 3,
      name: 'Tarea C',
      deadline: '2024-11-15',
      success: false,
      responsibles: [
        {
          fullName: 'Ana Martínez',
          age: 28,
          skills: [{ skill: 'React' }, { skill: 'Node.js' }],
        },
        {
          fullName: 'Luis Rodríguez',
          age: 35,
          skills: [{ skill: 'Vue.js' }, { skill: 'MongoDB' }],
        },
      ],
    },
  ];

  tasksFiltered = this.tasks;

  successTasks() {
    this.tasksFiltered = this.tasks.filter((task) => task.success);
  }

  pendingTasks() {
    this.tasksFiltered = this.tasks.filter((task) => !task.success);
  }

  allTasks() {
    this.tasksFiltered = this.tasks;
  }

  toggleTask(id: number) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        task.success = !task.success;
      }
      return task;
    });
  }
}
