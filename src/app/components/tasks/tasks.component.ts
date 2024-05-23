import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../models/task.model';
import { TaskDialogComponent } from '../../shared/task-dialog/task-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { TasksService } from '../../services/tasks.service';

@Component({
    selector: 'tasks',
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
    private projectId: string = '';
    private project: Project | null = null;
    public tasks: Array<Task> = [];

    constructor(
        private readonly dialog: MatDialog,
        private readonly activeRoute: ActivatedRoute,
        private readonly tasksService: TasksService
    ) {}

    public async ngOnInit(): Promise<void> {
        this.projectId = this.activeRoute.snapshot.params['id'];
        this.tasks = await this.tasksService.getTasks(this.projectId);
    }
    
    public openDialog(task?: Task) {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
              width: '350px',
              data: task ? task : { projectId: this.projectId }
        });
      
        dialogRef.afterClosed().subscribe(async result => {
            if (result) {
                this.tasks = await this.tasksService.getTasks(this.projectId);
            }
        });
    }

    public deleteTask(task: Task) {
        this.tasksService.deleteTask(task.projectId, task._id)
            .then(async () => this.tasks = await this.tasksService.getTasks(this.projectId));
    }
}

