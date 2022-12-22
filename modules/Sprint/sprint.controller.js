const SprintModel = require('./sprint');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const createSprint = async (req, res) => {
    try {
        
        const senderUser = req.user




        const { title, startTime, endTime ,} = req.body;

        const newSprint = await SprintModel.create({
            title,
            startTime,
            endTime,
            // sprintGoal
        });

        res.send({ success: 1, data: newSprint });
    } catch (error) {
        res.send({ success: 0, data: null, message: error.message })
    }
}
const deleteSprint = async (req, res) => {
    try {
        const { sprintId } = req.params;

        const deletesprint = await SprintModel
            .findByIdAndDelete(sprintId);

        res.send({ success: 1 });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const updateSprint = async (req, res) => {
    try {
        const { sprintId } = req.params;
        const dataUpdateSprint = req.body;

        const updatedSprint = await SprintModel
            .findByIdAndUpdate(sprintId, dataUpdateSprint, { new: true });

        res.send({ success: 1, data: updatedSprint });
    } catch (err) {
        res.status(400).send({ success: 0, data: null });
    }
}

const getSprints = async (req, res) => {
    try {
        const sprints = await (await SprintModel
            .find({})
            // .skip(offset)
            // .limit(limit)
        );
        const totalSprint = await SprintModel.countDocuments({});
        res.send(
            {
                success: 1,
                data: {
                    sprints: sprints,
                    total: totalSprint
                }
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [] });
    }
}

const getSprint = async (req, res) => {
    try {
        const { sprintId } = req.params;
        const sprint = await (await SprintModel
            .findById(sprintId)
        );
        res.send(
            {
                success: 1,
                data: sprint
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [] });
    }
}

module.exports = { createSprint, deleteSprint, updateSprint, getSprint, getSprints }