const BacklogModel = require('./backlog');
const TaskModel = require('../Task/task');
const ProjectModel = require('../project/project');

require('dotenv').config();

const createBacklog = async (req, res) => {
    try {
        // const {existedUser} = req.user;
        // console.log(existedUser);
        const { projectId, createdBy } = req.body;

        const searchProject = await ProjectModel.findById(projectId);

        console.log(searchProject);

        const newBacklog = await BacklogModel.create({
            projectId,
            createdBy
        });

        res.send({ success: 1, data: newBacklog });
    } catch (error) {
        res.send({ success: 0, data: null, message: error.message })
    }
}
const deleteBacklog = async (req, res) => {
    try {
        const { backlogId } = req.params;

        const deleteBacklog = await BacklogModel
            .findByIdAndDelete(backlogId);

        res.send({ success: 1 });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const updateBacklog = async (req, res) => {
    try {
        const { backlogId } = req.params;
        const dataUpdateBacklog = req.body;

        const updatedBacklog = await BacklogModel
            .findByIdAndUpdate(backlogId, dataUpdateBacklog, { new: true });

        res.send({ success: 1, data: updatedBacklog });
    } catch (err) {
        res.status(400).send({ success: 0, data: null, message: err.message });
    }
}

const getBacklogs = async (req, res) => {
    try {
        const { projectId } = req.query
        console.log(taskId);
        const backlogs = await BacklogModel.find({ 'projectId': projectId }
            // .skip(offset)
            // .limit(limit)
        );
        const totalBacklog = await BacklogModel.find({ 'projectId': projectId }).countDocuments({});
        res.send(
            {
                success: 1,
                data: {
                    backlogs: backlogs,
                    total: totalBacklog
                }
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}

const getBacklog = async (req, res) => {
    try {
        const { backlogId } = req.params;
        const backlog = await BacklogModel
            .findById(backlogId);

        // await console.log(backlog.prjectId.toString());
        // console.log(TaskModel.findById(comment.taskId));

        const project = await ProjectModel.findById(backlog.projectId)
        console.log(project);
        res.send(
            {
                success: 1,
                data: backlog

            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}

module.exports = { createBacklog, deleteBacklog, updateBacklog, getBacklog, getBacklogs }