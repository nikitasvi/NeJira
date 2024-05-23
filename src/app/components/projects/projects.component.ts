import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../../shared/create-project-dialog/create-project-dialog.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
    selector: 'projects',
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
    public projects: Array<Project> = [];

    constructor(
        private readonly dialog: MatDialog,
        private readonly projectService: ProjectService
    ) { }

    public ngOnInit(): void {
        this.getProjects();
        console.log('projects', this.projects);
    }
    
    public openDialog(project?: Project): void {
        const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
            height: '600px',
            width: '800px',
            data: project
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getProjects();;
        });
    }

    private async getProjects(): Promise<void> {
        this.projects = await this.projectService.getProjects() ?? [];
    }
}
