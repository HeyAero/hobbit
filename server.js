const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const usersRoutes = require('./routes/users');
const habitsRoutes = require('./routes/habits');
const authRoutes = require('./routes/auth');
server.use('/users', usersRoutes);
server.use('/habits', habitsRoutes);
server.use('/auth', authRoutes);

server.get('/', (req, res) => res.send('Welcome to Hobbit!'));

module.exports = server;