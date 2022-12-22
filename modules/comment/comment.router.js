const express = require('express');
const router = express.Router();
const needAuthenticated = require('../../middlewares/needAuthenticated')

const commentController = require('./comment.controller');

router.post('/create', needAuthenticated, commentController.createComment);
router.get('/:commentId',needAuthenticated, commentController.getComment);
router.get('/',needAuthenticated, commentController.getComments);
router.put('/:commentId',needAuthenticated, commentController.updateComment);
router.delete('/:commentId',needAuthenticated, commentController.deleteComment);


module.exports = router;