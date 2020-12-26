const router = require('express').Router();
const Project = require('../models/Project');
const { auth, admin } = require('../middleware/auth');

// Get all
router.get('/', auth, async (req, res) => {
    try {
        const porjects = await Project.find();
        res.status(200).json(porjects);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get one
router.get('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id.trim();
        const project = await Project.findOne({ _id: id });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Create
router.post('/', auth, admin, async (req, res) => {

    try {
        const project = new Project({
            title: escape(req.body.title),
            status: req.body.status ? escape(req.body.status) : 'Open',
            priority: req.body.priority ? escape(req.body.priority) : 'Low',
            details: escape(req.body.details),
        });
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(500).send(error);
    }
});

// update
router.put('/:id', auth, admin, async (req, res) => {
    try {
        const id = req.params.id.trim();
        await Project.findOneAndUpdate({ _id: id }, {
            "$set": {
                "title": escape(req.body.title),
                "status": escape(req.body.status),
                "priority": escape(req.body.priority),
                "details": escape(req.body.details),
                "updated" : Date.now()
            }
        });
        res.status(200).json('Project Updated');
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete
router.delete('/:id', auth, admin, async (req, res) => {
    try {
        const id = req.params.id.trim();
        await Project.findOneAndDelete({ _id: id });
        res.status(200).json('Project Deleted');
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;