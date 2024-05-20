import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Project } from "../models/project.model";

@Injectable({
	providedIn: 'root'
})
export class ProjectService {
	constructor(private readonly apiService: ApiService) { }

	public createProject(project: any): Promise<any> {
		debugger
		return this.apiService.post('api/projects', project);
	}

	public getProjects() {
		return this.apiService.get<Array<Project>>('api/projects');
	}
}