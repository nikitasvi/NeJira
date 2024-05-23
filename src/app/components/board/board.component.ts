import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task, TaskStatus } from '../../models/task.model';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
    public projectTasks: Array<Task> = [];
    public project!: Project | null;
    private projectId: string = '';
    public taskStatuses = Object.values(TaskStatus);
    
    constructor(
        private readonly projectService: ProjectService,
        private readonly tasksService: TasksService,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    public async ngOnInit(): Promise<void> {
        this.activatedRoute.params.subscribe(params => {
            this.projectId = params['id'];
        });

        this.project = await this.projectService.getProject(this.projectId);
        this.projectTasks = await this.tasksService.getTasks(this.projectId);
    }

    getTasksByStatus(status: 'todo' | 'inProgress' | 'done'): Task[] {
        return this.projectTasks.filter(task => task.status === status);
    }
    
    getStatusFromColumn(columnId: string): TaskStatus {
        switch (columnId) {
            case 'todo':
                return TaskStatus.TODO;
            case 'inProgress':
                return TaskStatus.IN_PROGRESS;
            case 'done':
                return TaskStatus.DONE;
            default:
                return TaskStatus.TODO;
        }
    }

    public async onDrop(event: CdkDragDrop<Task>, newStatus: 'todo' | 'inProgress' | 'done'): Promise<void> {
        if (event.previousContainer === event.container) {
            return;
        }

        const taskToMove = event.item.data;
        taskToMove.status = newStatus;

        this.tasksService.updateTask(taskToMove).then(async () => {
            this.projectTasks = await this.tasksService.getTasks(this.projectId);
        }, error => {
            console.error(error);
        });
    }
}
