const CommentModel = require('./comment');
const TaskModel = require('../Task/task');
const UserModel = require('../auth/user')
// const UserModel = require('../auth/user');




const createComment = async (req, res) => {
    try {
        // const {existedUser} = req.user;
        // console.log(existedUser);
        const senderUser = req.user
        const createdBy = senderUser._id
        // const user = userId.toString()
        console.log(createdBy);
        // if(userId === null || userId === undefined) {
        //     throw new Error('Authorization fail')
        // }
        const {
            content,
            taskId,
        } = req.body;

        const searchTask = await TaskModel.findById(taskId);

        console.log(searchTask);

        const data = {
            content,
            taskId,
            createdById: createdBy._id,
            username: senderUser.username
        }

        const newComment = await CommentModel.create(
            data
        );

        res.send({ success: 1, data: newComment });
    } catch (error) {
        res.send({ success: 0, data: null, message: error.message })
    }
}
const deleteComment = async (req, res) => {
    try {
        // const senderUser = req.user
        // const userId = senderUser._id

        // if (userId === null || userId === undefined) {
        //     throw new Error('Authorization fail')
        // }
        const { commentId } = req.params;
        // const comment = await CommentModel
        //     .findById(commentId);


        // const createdUser = await UserModel.findById(comment.createdBy)
        // if(comment.createdBy === userId){
        const deleteComment = await CommentModel
            .findByIdAndDelete(commentId);
        // }

        res.send({ success: 1 });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const dataUpdateComment = req.body;

        const updatedComment = await CommentModel
            .findByIdAndUpdate(commentId, dataUpdateComment, { new: true });

        res.send({ success: 1, data: updatedComment });
    } catch (err) {
        res.status(400).send({ success: 0, data: null, message: err.message });
    }
}

const getComments = async (req, res) => {
    try {
        const { taskId } = req.query
        console.log(taskId);
        const comments = await CommentModel.find({ 'taskId': taskId }
            // .skip(offset)
            // .limit(limit)
        );
        
        const totalComment = await CommentModel.find({ 'taskId': taskId }).countDocuments({});
        res.send(
            {
                success: 1,
                data: {
                    comments: comments,
                    total: totalComment
                }
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}

const getComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await CommentModel
            .findById(commentId);

        console.log(comment.task);
        console.log(comment.taskId.toString());
        // console.log(TaskModel.findById(comment.taskId));

        const task = await TaskModel.findById(comment.taskId)
        console.log(task);
        res.send(
            {
                success: 1,
                data: comment

            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}

module.exports = { createComment, deleteComment, updateComment, getComment, getComments }