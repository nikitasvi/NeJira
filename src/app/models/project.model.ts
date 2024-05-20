import { Sprint } from "./sprint.model";
import { Task } from "./task.model";
import { User } from "./user.model";

export class Project {
	public _id!: string;
	public creator!: User;
	public name!: string;
	public description: string = '';
	public creationDate!: Date;
	public updatingDate!: Date;
	public sprints: Array<Sprint> = [];
	public tasks: Array<Task> = [];
	public allowedUsers: Array<User> = []
}