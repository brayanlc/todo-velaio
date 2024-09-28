import { Skill } from './skill.model';

export interface Responsible {
  fullName: string;
  age: number;
  skills: Skill[];
}
