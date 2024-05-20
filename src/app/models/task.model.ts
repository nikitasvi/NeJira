export class Task {
    public _id!: string;
    public projectId!: string;
    public sprintId!: string | null; // null, если задача не в спринте
    public name!: string;
    public description: string = '';
    public status: TaskStatus = TaskStatus.TODO;
    public creationDate!: Date;
    public updatingDate!: Date;
}

export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'inProgress',
    DONE = 'done',
}