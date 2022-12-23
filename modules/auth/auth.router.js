const express = require('express');
const router = express.Router();
const isAdmin = require('../../middlewares/isAdmin');
const needAuthenticated = require('../../middlewares/needAuthenticated')

const authController = require('./auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/seeusers',needAuthenticated, authController.seeUsers);
router.get('/userInfor', authController.getUserInfor);

module.exports = router;
