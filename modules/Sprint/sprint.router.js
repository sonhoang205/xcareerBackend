const express = require('express');
const router = express.Router();

const sprintController = require('./sprint.controller');

router.post('/create', sprintController.createSprint);
router.get('/:taskId', sprintController.getSprint);
router.get('/', sprintController.getSprints);
router.put('/:taskId', sprintController.updateSprint);
router.delete('/:taskId', sprintController.deleteSprint);


module.exports = router;