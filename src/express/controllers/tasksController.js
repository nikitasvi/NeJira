const Task = require('../models/task');
const Project = require('../models/project');
const Sprint = require('../models/sprint');

const createTask = async (req, res) => {
	const { projectId, sprintId, name, description, status, assignedTo } = req.body;
	const taskData = { projectId, sprintId, name, description, status, assignedTo };
  
	try {
		const task = new Task(taskData);
		await task.save();
	
		await Project.findByIdAndUpdate(projectId, { $push: { tasks: task._id } });
		if (sprintId) {
			await Sprint.findByIdAndUpdate(sprintId, { $push: { tasks: task._id } });
		}
	
		res.status(201).json(task);
	} catch (error) {
	  	res.status(500).json({ error: error.message });
	}
};

const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({ projectId: req.params.projectId })
			.populate('assignedTo')
			.exec();

		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateTask = async (req, res) => {
	const { name, description, status, assignedTo } = req.body;
	const taskData = { name, description, status, assignedTo, updatingDate: new Date() };
  
	try {
		const task = await Task.findByIdAndUpdate(req.params.taskId, taskData, { new: true });
		if (!task) {
			return res.status(404).json({ error: 'Task not found' });
		}
		res.status(200).json(task);
	} catch (error) {
	  	res.status(500).json({ error: error.message });
	}
};

const deleteTask = async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.taskId);
		if (!task) {
		  return res.status(404).json({ error: 'Task not found' });
		}
	
		await Project.findByIdAndUpdate(req.params.projectId, { $pull: { tasks: req.params.taskId } });
		if (task.sprintId) {
		  await Sprint.findByIdAndUpdate(task.sprintId, { $pull: { tasks: req.params.taskId } });
		}
	
		res.status(200).json({ message: 'Task deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

const getTasksByProjectId = async (req, res) => {
	const { projectId } = req.params;
  
	try {
	  const tasks = await Task.find({ projectId })
	  	.populate('assignedTo')
		.exec();

	  res.status(200).json(tasks);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
};

const updateTaskStatus = async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
	createTask,
	getTasks,
	updateTask,
	deleteTask,
	getTasksByProjectId,
	updateTaskStatus
};