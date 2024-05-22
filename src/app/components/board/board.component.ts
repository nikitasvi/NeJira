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

    public onDrop(event: CdkDragDrop<Task[]>, newStatus: 'todo' | 'inProgress' | 'done') {
        debugger
        const taskToMove = event.item.data;
        taskToMove.status = newStatus;
        // You may need to call an API to update the task status in the backend
        // Assuming you have a method like updateTaskStatus in your service
        this.tasksService.updateTask(taskToMove).then(() => {
          // Task status updated successfully
          console.log('done');
        }, error => {
          // Handle error
          console.error(error);
        });
    }

    // public async onDrop(event: any, newStatus: TaskStatus): Promise<void> {
    //     debugger
    //     const taskIndex = this.projectTasks.findIndex(task => task._id === event.item.data._id);
      
    //     if (taskIndex > -1) {
    //         this.projectTasks[taskIndex].status = newStatus;
    //         // Update task status in backend service
    //         await this.tasksService.updateTask(this.projectTasks[taskIndex]);
    //     }
    //     // const task = event.item.data;
    //     // console.log(task);
        
    //     // //task.sr = newStatus;
      
    //     // // Update the task status in the backend
    //     // await this.tasksService.updateTask(task);
          
    //     // Refresh the task lists
    //     this.projectTasks = await this.tasksService.getTasks(this.projectId);
    // }
}
