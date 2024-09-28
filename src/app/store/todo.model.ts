import { Responsible } from './responsible.model';

export interface Todo {
  id: string;
  name: string;
  deadline: string;
  success: boolean;
  responsibles: Responsible[];
}
