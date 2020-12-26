const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const config = require('./config');

const app = express();

// Database
function dbConnect() {
    mongoose.connect(config.DATABASE, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => console.log('Connected to database'))
        .catch(err => {
            console.error("Unable to connect, retrying to connect");
            dbConnect();
        });
}

dbConnect();

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

// Start the application
const port = process.env.PORT || config.PORT;
app.listen(port, () => {
    console.log(`Running at ${port}`);
});