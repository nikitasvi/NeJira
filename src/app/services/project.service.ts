import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Project } from "../models/project.model";

@Injectable({
	providedIn: 'root'
})
export class ProjectService {
	constructor(private readonly apiService: ApiService) { }

	public createProject(project: any): Promise<any> {
		return this.apiService.post('api/projects', project);
	}

	public getProjects() {
		return this.apiService.get<Array<Project>>('api/projects');
	}

	public getProject(id: string) {
		return this.apiService.get<Project>(`api/projects/${id}`);
	}

	public updateProject(project: Project) {
		return this.apiService.put(`api/projects/${project._id}`, project);
	}

	public deleteProject(id: string) {
		return this.apiService.delete(`api/projects/${id}`);
	}
}