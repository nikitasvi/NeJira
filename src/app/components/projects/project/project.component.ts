import { Component, Input } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../../../shared/create-project-dialog/create-project-dialog.component';

@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss'
})
export class ProjectComponent {
    @Input() project!: Project;

    constructor(
        private readonly projectService: ProjectService,
        private readonly matDialog: MatDialog
    ) {}

    public deleteProject(event: Event): void {
        event.stopPropagation();
        this.projectService.deleteProject(this.project._id);
    }

    public updateProject(event: Event) {
        event.stopPropagation();
        const dialogRef = this.matDialog.open(CreateProjectDialogComponent, {
            height: '600px',
            width: '800px',
            data: this.project
        });
    }
}
