const router = require('express').Router();
const Project = require('../models/Project');
const { auth } = require('../middleware/auth');

// push
router.post('/:id', auth, async (req, res) => {

    const task = {
        project: escape(req.body.project),
        title: escape(req.body.title),
        status: escape(req.body.status),
        priority: escape(req.body.priority),
        source: escape(req.body.source),
        impact: escape(req.body.impact),
        details: escape(req.body.details),
        reporter: {
            id: escape(req.body.reporter.id),
            name: escape(req.body.reporter.name)
        },
        assignee: {
            id: escape(req.body.assignee.id),
            name: escape(req.body.assignee.name)
        }
    };

    try {
        await Project.findOneAndUpdate({ _id: req.params.id }, { $push: { tasks: task } });
        res.status(200).json('Task Added');
    } catch (error) {
        res.status(500).json(error);
    }
});

// edit
router.put('/:project/:task', auth, async (req, res) => {

    try {
        await Project.findOneAndUpdate({ _id: req.params.project, "tasks._id": req.params.task }, {
            $set: {
                "tasks.$.title": escape(req.body.title),
                "tasks.$.status": escape(req.body.status),
                "tasks.$.priority": escape(req.body.priority),
                "tasks.$.source": escape(req.body.source),
                "tasks.$.impact": escape(req.body.impact),
                "tasks.$.details": escape(req.body.details),
                "tasks.$.reporter": {
                    id: escape(req.body.reporter.id),
                    name: escape(req.body.reporter.name)
                },
                "tasks.$.assignee": {
                    id: escape(req.body.assignee.id),
                    name: escape(req.body.assignee.name)
                },
                "tasks.$.updated": Date.now()
            }
        });
        res.status(200).json('Task Updated');
    } catch (error) {
        res.status(500).json(error);
    }

});

// Start-it
router.put('/start/:project/:task', auth, async (req, res) => {

    try {
        await Project.findOneAndUpdate({ _id: req.params.project, "tasks._id": req.params.task }, {
            $set: {
                "tasks.$.status": 'On Progress',
                "tasks.$.updated": Date.now()
            }
        });
        res.status(200).json('Task Updated');
    } catch (error) {
        res.status(500).json(error);
    }

});

// Pend-it
router.put('/pend/:project/:task', auth, async (req, res) => {

    try {
        await Project.findOneAndUpdate({ _id: req.params.project, "tasks._id": req.params.task }, {
            $set: {
                "tasks.$.status": 'Pending',
                "tasks.$.updated": Date.now()
            }
        });
        res.status(200).json('Task Updated');
    } catch (error) {
        res.status(500).json(error);
    }

});

// Completed
router.put('/finish/:project/:task', auth, async (req, res) => {

    try {
        await Project.findOneAndUpdate({ _id: req.params.project, "tasks._id": req.params.task }, {
            $set: {
                "tasks.$.status": 'Completed',
                "tasks.$.updated" : Date.now()
            }
        });
        res.status(200).json('Task Updated');
    } catch (error) {
        res.status(500).json(error);
    }

});

module.exports = router;