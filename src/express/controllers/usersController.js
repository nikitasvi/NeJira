const User = require('../models/user');

const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: 'Server error on endpoint /users' });
	}
};

const deleteUser = async (req, res) => {
	const { id } = req.params;
  
	try {
		const user = await User.findByIdAndDelete(id);
		if (!user) {
			return res.status(404).send({ message: 'User not found!' });
		}
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: 'Server error on endpoint /users/:id' });
	}
};

module.exports = {
	getUsers,
	deleteUser,
};