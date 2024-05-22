const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskStatuses = ['todo', 'inProgress', 'done'];

const TaskSchema = new Schema({
	projectId: { type: String, required: true },
	sprintId: { type: String, default: null },
	name: { type: String, required: true },
	description: { type: String, default: '' },
	status: { type: String, enum: taskStatuses, default: 'todo' },
	creationDate: { type: Date, default: Date.now },
	updatingDate: { type: Date, default: Date.now },
	assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Task = mongoose.model('Task', TaskSchema, 'tasks');

module.exports = Task;