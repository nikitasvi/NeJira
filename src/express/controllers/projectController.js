const Project = require('../models/project');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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
			.populate('tasks')
            .populate('allowedUsers')
            .exec();

			// .populate('sprints')
		res.status(200).json(projects);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getUserProjects = async (req, res) => {
	const token = req.header('Authorization').replace('Bearer ', '');
	const decoded = jwt.verify(token, 'very_secret_key');
	const userId = decoded.id;

    try {
        const projects = await Project.find({
            $or: [
                { creator: userId },
                { allowedUsers: userId }
            ]
        })
        .populate('creator')
        .populate('tasks')
        .populate('allowedUsers')
        .exec();

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProject = async (req, res) => {
	const id = req.params.id;
  
	try {
		const project = await Project.findById(id)
			.populate('creator')
			.populate('tasks')
			.populate('allowedUsers')
			.exec();

			// .populate('sprints')
		if (!project) {
			return res.status(404).json({ error: 'Project not found' });
		}
	
		res.status(200).json(project);
	} catch (error) {
	  	res.status(500).json({ error: error.message });
	}
};

const updateProject = async (req, res) => {
	try {
		const { _id, name, description, allowedUsers } = req.body;
		const projectData = { name, description, allowedUsers };

		const project = await Project.findByIdAndUpdate(_id, projectData, { new: true });
		if (!project) {
			return res.status(404).json({ error: 'Project not found' });
		}
		res.status(200).json(project);
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
	getUserProjects,
	getProject,
	updateProject,
	deleteProject
}