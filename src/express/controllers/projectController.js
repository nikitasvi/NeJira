const Project = require('../models/project');

const createProject = async (req, res) => {
	try {
		const { creator, name, description, allowedUsers } = req.body;
		const project = new Project({
			creator,
			name,
			description,
			allowedUsers
		});
		await project.save();
		res.status(201).json(project);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getProjects = async (req, res) => {
	try {
		const projects = await Project.find()
			.populate('creator')
            .populate('allowedUsers')
            .exec();

			// .populate('sprints')
			// .populate('tasks')
		res.status(200).json(projects);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteProject = async (req, res) => {
	try {
		const project = await Project.findByIdAndDelete(req.params.id);
		if (!project) {
			return res.status(404).json({ error: 'Project not found' });
		}
		res.status(200).json({ message: 'Project deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}


module.exports = {
	createProject,
	getProjects,
	deleteProject
}