const router = require('express').Router();
const Project = require('../models/Project');
const { auth } = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    let todos = [];
    try {
        const projects = await Project.find();
        projects.forEach(project => {
            project.tasks.forEach(task => {
                if(task.assignee.id == req.id) {
                    todos.push(task);
                }
            })
        });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;