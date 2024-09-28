import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTodoComponent } from './modules/todo/list-todo/list-todo.component';
import { CreateTodoComponent } from './modules/todo/create-todo/create-todo.component';

const routes: Routes = [
  {
    path: 'todo',
    children: [
      {
        path: 'create',
        component: CreateTodoComponent,
      },
      {
        path: 'list',
        component: ListTodoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
