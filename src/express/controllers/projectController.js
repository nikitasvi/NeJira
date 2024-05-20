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

module.exports = {
	createProject,
	getProjects
}