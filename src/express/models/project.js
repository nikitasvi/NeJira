const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	creator: { type: Schema.Types.ObjectId, ref: 'User' },
	name: { type: String, required: true },
	description: { type: String, default: '' },
	creationDate: { type: Date, default: Date.now },
	updatingDate: { type: Date, default: Date.now },
	sprints: [{ type: Schema.Types.ObjectId, ref: 'Sprint' }],
	tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
	allowedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Project = mongoose.model('Project', ProjectSchema, 'projects');

module.exports = Project;
