const { Schema, model } = require('mongoose');

const taskSchema = Schema(
    {
        project: { type: String, required: true },
        title: { type: String, required: true, max: 50 },
        status: { type: String, enum: ['Open', 'On Progress', 'Pending', 'Completed'], required: true },
        priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], required: true },
        source: { type: String, enum: ['In-House','Alpha Tester', 'Beta Tester', 'Client','Support'], required: true },
        details: { type: String, required: true, max: 255 },
        reporter: {
            id: { type: Schema.Types.ObjectId, required: true },
            name: { type: String, required: true, max: 50 }
        },
        assignee: {
            id: { type: Schema.Types.ObjectId, required: true },
            name: { type: String, required: true, max: 50 }
        },
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now }
    }
);

taskSchema.set('toJSON', {
    transform: (doc, { __v, ...rest }, options) => rest
})


const projectSchema = Schema(
    {
        title: { type: String, required: true, max: 50 },
        status: { type: String, enum: ['Open', 'Completed'], required: true },
        priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
        details: { type: String, required: true, max: 255 },
        tasks: [taskSchema],
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now }
    }
);

projectSchema.set('toJSON', {
    transform: (doc, { __v, ...rest }, options) => rest
})

module.exports = model('Project', projectSchema);
