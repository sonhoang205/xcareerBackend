const express = require('express');
const router = express.Router();
const needAuthenticated = require('../../middlewares/needAuthenticated')

const backlogController = require('./backlog.controller');

router.post('/create', backlogController.createBacklog);
router.get('/:backlogId', backlogController.getBacklog);
router.get('/', backlogController.getBacklogs);
router.put('/:backlogId', backlogController.updateBacklog);
router.delete('/:backlogId', backlogController.deleteBacklog);


module.exports = router;