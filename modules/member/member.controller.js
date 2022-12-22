const MemberModel = require('./member');
const ProjectModel = require('../project/project')
const UserModel = require('../auth/user');

const addMember = async (req, res) => {
    try {

        const senderUser = req.user
        const {
            userId,
            projectId
        } = req.body;

        const findMember = await MemberModel.find({ 'userId': userId, 'projectId': projectId })

        if (findMember.length === 0) {
            const newMember = await MemberModel.create({
                userId,
                projectId
            });

            res.send({ success: 1, data: newMember });
        }
        throw new Error('User da trong nay roi')

    } catch (error) {
        res.send({ success: 0, message: error.message })
    }
}
const kickMember = async (req, res) => {
    try {
        const { userId, projectId } = req.query;

        const kickMember = await MemberModel
            .deleteMany({ 'userId': userId, 'projectId': projectId });

        res.send({ success: 1 });
    } catch (error) {
        res.status(400).send({ success: 0, message: error.message });
    }
}
const getMembers = async (req, res) => {
    try {
        const { projectId } = req.params;



        const members = await MemberModel.find({ 'projectId': projectId })


        const ids = []
        members.map((member) => {

            ids.push(member.userId)

        });
        const getMembers = await UserModel.find({ '_id': { $in: ids } })


        res.send({ success: 1, data: getMembers });
    } catch (error) {
        res.status(400).send({ success: 0, data: null, message: error.message })
    }
}
const getMember = async (req, res) => {
    try {
        const { projectId, userId } = req.query;

        const findMember = await MemberModel.findOne({ 'userId': userId, 'projectId': projectId })

        // .$where('userId', userId).$where('projectId', projectId)

        res.send({ success: 1, data: findMember });
    } catch (error) {
        res.status(400).send({ success: 0, data: null, message: error.message })
    }
}
const getProjectsMember = async (req, res) => {
    try {
        // const senderUser = req.user
        // const userId = senderUser._id
        const { userId } = req.params
        const projectsMember = await MemberModel.find({ 'userId': userId })
        const ids = []
        projectsMember.map((project) => {

            ids.push(project.projectId)

        });

        const projects = await ProjectModel.find({ '_id': { $in: ids } })

        res.send({ success: 1, data: projects })
    } catch (error) {
        res.status(400).send({ success: 0, data: null, message: error.message })

    }
}


module.exports = { addMember, kickMember, getMembers, getMember, getProjectsMember }