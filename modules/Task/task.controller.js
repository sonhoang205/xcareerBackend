const TaskModel = require('./task');



require('dotenv').config();

const createTask = async (req, res) => {
    try {

        // const senderUser = req.user

        const { title, description, status, assignee, reporter, startTime, endTime, projectID } = req.body;

        const newTask = await TaskModel.create({
            title,
            description,
            status,
            projectID,
            assignee,
            reporter,
            startTime,
            endTime,
            //   createdBy: existedUser._id,
        });

        res.send({ success: 1, data: newTask });
    } catch (error) {
        res.send({ success: 0, data: null, message: error.message })
    }
}
const deleteAllTask = async (req, res) => {
    try {
        const deleteAllTask = await TaskModel.deleteMany({})

        res.send({ success: 1 })
    } catch (error) {
        res.send({ success: 0, message: error.message })

    }
}
const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const deleteTask = await TaskModel
            .findByIdAndDelete(taskId);

        res.send({ success: 1 });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const updateStatusTask = async (req, res) => {
    try {

        const { status, taskId } = req.body
        const updateStatusTask = await TaskModel.findByIdAndUpdate({ _id: taskId }, { status: status }, { new: true })

        res.send({ success: 1, data: updateStatusTask })

    } catch (error) {
        res.status(400).send({ success: 0, message: error.message })
    }
}

const updateTask = async (req, res) => {
    try {

        const { taskId } = req.params;
        const dataUpdateTask = req.body;

        const updatedTask = await TaskModel
            .findByIdAndUpdate(taskId, dataUpdateTask, { new: true });
        res.send({ success: 1, data: updatedTask });
    } catch (err) {
        res.status(400).send({ success: 0, data: null, message: err.message });
    }
}
const updateFile = async (req, res) => {
    try {
        const { taskId, fileName } = req.query;

        const updateFileName = await TaskModel.findByIdAndUpdate(taskId, { fileName: fileName }, { new: true })
        res.send({ success: 1, })
    } catch (error) {
        res.send({ success: 0, data: null, message: error.message })
    }
}


const getTasks = async (req, res) => {
    try {

        const { projectId, status } = req.query;
        const tasks = await TaskModel
            .find({ 'projectID': projectId, 'status': status })
            // .skip(offset)
            // .limit(limit)
            ;
        // const totalTasks = await TaskModel
        //     .find({})
        //     .where('projectID', projectId)
        //     .where('status', status).countDocuments({});
        res.send(
            {
                success: 1,
                data: {
                    tasks: tasks,
                    // total: totalTasks
                }
            });
    } catch (error) {
        res.status(400).send({ success: 0, message: error.message });
    }
}

const getTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await (await TaskModel
            .findById(taskId)
        );
        res.send(
            {
                success: 1,
                data: task
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}
const getAllTask = async (req, res) => {
    try {
        const totalTask = await TaskModel
            .find({}).countDocuments()
        ;
        res.send(
            {
                success: 1,
                data: totalTask
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}



module.exports = {getAllTask, createTask, deleteTask, updateTask, getTasks, getTask, updateStatusTask, deleteAllTask, updateFile }