const express = require('express');
const { createTask, getTasks, updateTask, deleteTask, getTasksByProjectId, updateTaskStatus } = require('../controllers/tasksController'); 

const router = express.Router({ mergeParams: true });

router.post('/', createTask);
router.get('/', getTasksByProjectId);
router.put('/:taskId', updateTask);
router.patch('/:taskId/status', updateTaskStatus);
router.delete('/:taskId', deleteTask);

module.exports = router;