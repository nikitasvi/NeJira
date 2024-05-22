import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, TaskStatus } from '../../models/task.model';
import { ProjectService } from '../../services/project.service';
import { TasksService } from '../../services/tasks.service';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-task-dialog',
    templateUrl: './task-dialog.component.html',
    styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
    public taskForm: FormGroup;
    public statuses = Object.values(TaskStatus);
    public allowedUsers: Array<User> = [];
    private projectId: string = '';
    public project!: Project | null;

    constructor(
        public dialogRef: MatDialogRef<TaskDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private readonly projectService: ProjectService,
        private readonly tasksService: TasksService,
    ) {
        this.taskForm = this.fb.group({
            name: [data.name, Validators.required],
            description: [data.description],
            status: [data.status, Validators.required],
            assignedTo: [data.assignedTo]
        });
    }

    public ngOnInit(): void {
        if (this.data.projectId) {
            this.projectId = this.data.projectId;
        } else {
            this.projectId = this.data.task.projectId;
        }

        console.log(this.projectId);

        this.projectService.getProject(this.projectId).then(project => {
            this.project = project;
            this.allowedUsers = project?.allowedUsers ?? [];
        });
    }

    public onSave(): void {
        if (this.taskForm.valid) {
            try {
                const projectData = {
                    projectId: this.projectId,
                    name: this.taskForm.value.name,
                    description: this.taskForm.value.description,
                    status: this.taskForm.value.status,
                    assignedTo: this.taskForm.value.assignedTo
                }

                this.tasksService.createTask(projectData).then(() => this.dialogRef.close({ ...this.data, ...this.taskForm.value }));
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    public onCancel(): void {
        this.dialogRef.close();
    }
}
