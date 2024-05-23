import { Component, Inject, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/users.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../models/project.model';

@Component({
    selector: 'app-create-project-dialog',
    templateUrl: './create-project-dialog.component.html',
    styleUrl: './create-project-dialog.component.scss'
})
export class CreateProjectDialogComponent implements OnInit {
    public currentUser: User = AuthService.getUser();

    public allUsers: Array<User> = [];
    public selectedUsers: Array<User> = [this.currentUser];

    public userControl: FormControl = new FormControl('');
    public filteredUsers!: Observable<User[]>;

    public createProjectForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        description: new FormControl('')
    });

    constructor(
        private readonly projectService: ProjectService,
        private readonly usersService: UserService,
        private readonly dialogRef: MatDialogRef<CreateProjectDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Project
    ) { }

    public async ngOnInit(): Promise<void> {
        this.allUsers = await this.usersService.getUsers() ?? [];
        this.filteredUsers = this.userControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
        );

        if (this.data) {
            this.initFormForEdit(this.data);
        }
    }

    private initFormForEdit(project: any): void {
        this.createProjectForm.controls['name'].setValue(project.name);
        this.createProjectForm.controls['description'].setValue(project.description);
        this.selectedUsers = project.allowedUsers;
    }

    public onSave(): void {     
        if (this.data) {
            this.data.name = this.createProjectForm.controls['name'].value;
            this.data.description = this.createProjectForm.controls['description'].value;
            this.projectService.updateProject(this.data)
                .then(() => this.dialogRef.close());
        } else {
            const currentUser = AuthService.getUser();
            const name = this.createProjectForm.controls['name'].value;
            const description = this.createProjectForm.controls['description'].value;
    
            this.projectService.createProject({ creator: currentUser._id, name: name, description: description, allowedUsers: this.selectedUsers })
                .then(() => this.dialogRef.close());
        }
    }

    private _filter(value: any): User[] {
        const filterValue = typeof value === 'object' && 'username' in value
            ? value.username
            : (value as string).toLowerCase();

        return this.allUsers.filter(user => user.username.toLowerCase().includes(filterValue));
    }
    
    public displayFn(user: User): string {
        return user && user.username ? user.username : '';
    }

    public addUser(event: any): void {
        const user = event.option.value;
        if (this.selectedUsers.indexOf(user) === -1) {
          this.selectedUsers.push(user);
        }
        
        this.userControl.setValue('');
    }
    
    public removeUser(user: User): void {
        const index = this.selectedUsers.indexOf(user);
        if (index >= 0) {
          this.selectedUsers.splice(index, 1);
        }
    }
}
