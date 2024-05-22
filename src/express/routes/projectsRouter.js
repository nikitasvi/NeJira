const express = require('express');
const { getProjects, getUserProjects, getProject, createProject, deleteProject } = require('../controllers/projectController');

const router = express.Router();

router.get('/', getUserProjects);
router.get('/:id', getProject);
router.post('/', createProject);
router.delete('/:id', deleteProject)

module.exports = router;
