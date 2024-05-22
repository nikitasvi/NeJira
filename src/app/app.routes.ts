import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { BoardComponent } from './components/board/board.component';
import { TasksComponent } from './components/tasks/tasks.component';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
    { 
		path: 'projects', 
		children: [
			{ path: '', component: ProjectsComponent },
			{ path: ':id', component: BoardComponent },
			{ path: ':id/tasks', component: TasksComponent }
		]
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}