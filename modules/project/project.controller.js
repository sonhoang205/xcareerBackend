const ProjectModel = require('./project');
const jwt = require('jsonwebtoken');

const MemberModel = require('../member/member')

require('dotenv').config();

const createProject = async (req, res) => {
    try {
        const senderUser = req.user
        const lead = senderUser._id
        const { name, type, workspaceId } = req.body;

        const newProject = await ProjectModel.create({
            name,
            type,
            workspaceId,
            lead
        });

        res.send({ success: 1, data: newProject });
    } catch (error) {
        res.send({ success: 0, data: null, message: error.message })
    }
}
const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const deleteProject = await ProjectModel
            .findByIdAndDelete(projectId);

        res.send({ success: 1 });
    } catch (err) {
        res.status(400).send({ success: 0, message: err.message });
    }
}

const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const dataUpdateProject = req.body;

        const updatedProject = await ProjectModel
            .findByIdAndUpdate(projectId, dataUpdateProject, { new: true });

        res.send({ success: 1, data: updatedProject });
    } catch (err) {
        res.status(400).send({ success: 0, data: null, message: err.message });
    }
}

const getProjects = async (req, res) => {
    try {
        const senderUser = req.user
        const userId = senderUser._id
        const { workspaceId } = req.query


        const projects = await ProjectModel
            .find({  }).where({'workspaceId': workspaceId}).where({'lead': userId})
            // .skip(offset)
            // .limit(limit)
        ;
        const totalProject = await ProjectModel.find({ 'workspaceId': workspaceId }).countDocuments({});
        console.log(typeof projects);
        res.send(
            {
                success: 1,
                data: {
                    projects: projects,
                    total: totalProject
                }
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}

const getProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await (await ProjectModel
            .findById(projectId)
        );
        res.send(
            {
                success: 1,
                data: project
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}
const getAllProject = async (req, res) => {
    try {
        
        const allProjects = await ProjectModel
            .find({}).countDocuments()
        ;
        res.send(
            {
                success: 1,
                data: allProjects
            });
    } catch (err) {
        res.status(400).send({ success: 0, data: [], message: err.message });
    }
}


module.exports = { getAllProject, createProject, deleteProject, updateProject, getProject, getProjects }