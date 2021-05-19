const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const config = require('./config');
const db = require('./db');

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.static("public"));

// Routing
const projects= require('./routes/projects');
const tasks = require('./routes/tasks');
const todos = require('./routes/todos');
const user = require('./routes/user');
app.use('/projects', projects);
app.use('/tasks', tasks);
app.use('/todos', todos);
app.use('/user', user);
// After building the frontend 
// app.get('*', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// })

// starting the application
db.connect(app, config.PORT);
