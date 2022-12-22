const express = require('express');
const router = express.Router();

const multer = require('multer')

const uploadController = require('./upload.controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename:function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage:storage})


router.post('/disk', upload.single('file'), uploadController.uploadToDisk)


module.exports = router