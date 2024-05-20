import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/users.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-create-project-dialog',
    templateUrl: './create-project-dialog.component.html',
    styleUrl: './create-project-dialog.component.scss'
})
export class CreateProjectDialogComponent implements OnInit {
    public allUsers: Array<User> = [];
    public selectedUsers: Array<User> = [];

    public userControl: FormControl = new FormControl('');

    public filteredUsers!: Observable<User[]>;

    public createProjectForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        description: new FormControl('')
    });

    constructor(
        private readonly authService: AuthService,
        private readonly projectService: ProjectService,
        private readonly usersService: UserService
    ) { }

    public async ngOnInit(): Promise<void> {
        this.allUsers = await this.usersService.getUsers() ?? [];
        this.filteredUsers = this.userControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
        );
    }

    public createProject(): void {
        const currentUser = this.authService.currentUser;
        const name = this.createProjectForm.controls['name'].value;
        const description = this.createProjectForm.controls['description'].value;

        this.projectService.createProject({ creator: currentUser._id, name: name, description: description, allowedUsers: this.selectedUsers });
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
