const mongoose = require('mongoose');
const TaskSchema = require('../models/task').Schema;

const Schema = mongoose.Schema;

const SprintSchema = new Schema({
	projectId: { type: String, required: true },
	name: { type: String, required: true },
	description: { type: String, default: '' },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

const Sprint = mongoose.model('Sprint', SprintSchema, 'sprints');

module.exports = Sprint;
