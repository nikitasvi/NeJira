const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db') ;

const authRoutes = require('./routes/authRouter');
const usersRoutes = require('./routes/usersRouter');
const projectRoutes = require('./routes/projectsRouter');

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));