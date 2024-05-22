import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
	providedIn: 'root'
})
export class TasksService {
	constructor(private readonly apiService: ApiService) {}

	public createTask(task: any): Promise<any> {
		return this.apiService.post(`api/projects/${task.projectId}/tasks`, task);
	}

	public getTasks(projectId: string): Promise<any> {
		return this.apiService.get(`api/projects/${projectId}/tasks`);
	}

	public updateTask(task: any): Promise<any> {
		return this.apiService.put(`api/projects/${task.projectId}/tasks/${task._id}`, task);
	}

	// public updateTaskStatus(taskId: string, status: TaskStatus): Promise<void> {
	// 	return this.apiService.patch<void>(`api/projects/${task.projectId}/tasks/${taskId}/status`, { status }).toPromise();
	// }

	public deleteTask(projectId: string, taskId: number): Promise<any> {
		return this.apiService.delete(`api/projects/${projectId}/tasks/${taskId}`);
	}
}