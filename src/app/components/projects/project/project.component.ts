import { Component, Input } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';

@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss'
})
export class ProjectComponent {
    @Input() project!: Project;

    constructor(
        private readonly projectService: ProjectService,
    ) {}

    public deleteProject(event: Event): void {
        event.stopPropagation();
        this.projectService.deleteProject(this.project._id);
    }
}
