const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
const { register, login } = authController;

router.post('/register', register);
router.post('/login', login);

module.exports = router;
