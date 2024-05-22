import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routes";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ApiService } from "./services/api.service";
import { AuthService } from "./services/auth.service";
import { ReactiveFormsModule } from "@angular/forms";
import { ProjectsComponent } from "./components/projects/projects.component";
import { HeaderComponent } from "./components/header/header.component";
import { ProjectComponent } from "./components/projects/project/project.component";
import { CreateProjectDialogComponent } from "./shared/create-project-dialog/create-project-dialog.component";
import { ProjectService } from "./services/project.service";
import { UserService } from "./services/users.service";
import { BoardComponent } from "./components/board/board.component";
import { TaskDialogComponent } from "./shared/task-dialog/task-dialog.component";
import { TasksService } from "./services/tasks.service";
import { TasksComponent } from "./components/tasks/tasks.component";
import { FilterByStatusPipe } from "./pipes/filter-by-status.pipe";



@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		ProjectsComponent,
		HeaderComponent,
		ProjectComponent,
		CreateProjectDialogComponent,
		BoardComponent,
		TasksComponent,
		TaskDialogComponent,
		FilterByStatusPipe
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		AppRoutingModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		MatToolbarModule,
		MatDialogModule,
		MatSelectModule,
		MatChipsModule,
		MatAutocompleteModule,
		HttpClientModule,
		DragDropModule
	],
	providers: [
    	provideAnimationsAsync(),
		ApiService,
		AuthService,
		ProjectService,
		UserService,
		TasksService
  	],
})
export class AppModule { }