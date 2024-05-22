import { Pipe, PipeTransform } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';

@Pipe({
    name: 'filterByStatus',
})
export class FilterByStatusPipe implements PipeTransform {
    transform(tasks: Task[], status: 'todo' | 'inProgress' | 'done'): Task[] {
      return tasks.filter(task => task.status === status);
    }
}
