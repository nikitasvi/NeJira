import { Task } from "./task.model";

export class Sprint {
    public _id!: string;
    public projectId!: string;
    public name!: string;
	public description: string = '';
    public startDate!: Date;
    public endDate!: Date;
    public tasks: Task[] = []; // задачи, относящиеся к этому спринту
}