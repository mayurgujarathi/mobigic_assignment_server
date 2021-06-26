const express = require('express')
const router = express.Router()
// const checkAuth = require('../utils/jwt.js');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: { fileSize: '3mb' } });
const uploadFile = require('../../src/middleware/fileUpload');
const userController = require('../controller/user.controller');

module.exports = app => {
    router.post('/register', userController.insertUser);
    router.post('/login', userController.login);
    router.post('/file-upload', userController.uploadFile);
    router.get('/files', userController.getFiles);
    router.delete('/file', userController.deleteFile);
    router.get('/download/file', userController.downloadFileByCode);

    app.use('/api/v1/user', router);
}