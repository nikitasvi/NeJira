import { Component, Input } from '@angular/core';
import { Project } from '../../../models/project.model';

@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss'
})
export class ProjectComponent {
    @Input() project!: Project;
}
