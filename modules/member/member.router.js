const express = require('express');
const router = express.Router();
const needAuthenticated = require('../../middlewares/needAuthenticated');

const memberController = require('./member.controller');

router.post('/add', memberController.addMember);
router.delete('/kick', memberController.kickMember);
router.get('/projectId/:projectId', memberController.getMembers);
router.get('/', memberController.getMember);
router.get('/userId/:userId', memberController.getProjectsMember);

// router.get('/', needAuthenticated, taskController.getTasks);
// router.put('/:taskId', needAuthenticated, taskController.updateTask);
// router.put('/updatestatus', needAuthenticated, taskController.updateStatusTask);
// router.delete('/:taskId', needAuthenticated, taskController.deleteTask);
// router.delete('/', taskController.deleteAllTask);


module.exports = router;