const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET_KEY = 'very_secret_key';

const register = async (req, res) => {
	const { username, email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 8);

	try {
		const user = new User({
			username,
			email,
			password: hashedPassword,
		});

		await user.save();
		res.status(201).json(user);
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: 'User already exists!' });
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).send({ message: 'User not found!' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).send({ message: 'Invalid password!' });
		}

		const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
		res.send({ user, token });
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: 'Server error on endpoint /login' });
	}
};

module.exports = {
	register,
	login
};