const express = require('express');
const router = express.Router();
const needAuthenticated = require('../../middlewares/needAuthenticated')

const projectController = require('./project.controller');

router.post('/create',needAuthenticated,  projectController.createProject);
router.get('/:projectId',needAuthenticated, projectController.getProject);
router.get('/',needAuthenticated, projectController.getProjects);
router.get('/all', projectController.getAllProject);
router.put('/:projectId',needAuthenticated, projectController.updateProject);
router.delete('/:projectId',needAuthenticated, projectController.deleteProject);


module.exports = router;