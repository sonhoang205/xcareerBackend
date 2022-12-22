const mongoose = require('mongoose');

const SprintSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    // status: {
    //     type: String,
    //     require: true
    // },
    startTime: {
        type: Date,
        default: Date.now,
    },
    
    endTime: {
        type: Date,
        require: true
    },
    // sprintGoal: {
    //     type: String
    // }
},
    {
        // tự động thêm createdAt, updatedAt
        timestamps: true
    });

const SprintModel = mongoose.model('Sprint', SprintSchema);

module.exports = SprintModel;
