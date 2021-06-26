const userService = require('../service/user.service');
const fileUpload = require('../middleware/fileUpload');
const fs = require('fs');
const baseUrl = "http://localhost:8080/uploads/";
const saltRounds = 10;
const bcrypt = require('bcrypt');
const accessTokenSecret = "xYudnk!7823bm%nVgdBNks1";
const jwt = require('jsonwebtoken');

exports.insertUser = async (req, res) => {
    let response, user = {};

    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 400,
            message: 'invalid fields',
            data: null
        });
    }

    const username = await userService.findUserByUsername(req.body.username);
    if (username) {
        return res.status(400).json({
            status: 400,
            message: `username ${req.body.username} is already exists!`,
            data: null
        });  
    }

    const email = await userService.findUserByEmailId(req.body.email);
    if (email) {
        return res.status(400).json({
            status: 400,
            message: `email ${req.body.email} is already exists!`,
            data: null
        });  
    }

    //
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            throw err
        } else {
            bcrypt.hash(req.body.password, salt, async function (err, hash) {
                if (err) {
                    throw err
                } else {
                    user.email = req.body.email,
                    user.username = req.body.username,
                    user.password = hash,
                    user.created_at = new Date(),
                    user.updated_at = new Date()
                }

                console.log('creting user: ', user);

                try {
                    response = await userService.insertUser(user);
                } catch (error) {
                    return res.status(500).json({
                        status: 500,
                        message: error.message,
                        data: null
                    });
                }
                return res.status(200).json({
                    status: 200,
                    message: 'Resource added successfully!',
                    data: response.id
                });
            })
        }
    })
    //
    
}

exports.login = async (req, res) => {
    let user;

    try {
        user = await userService.findUserByUsernameAndPassword(req.body);
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
    
    if (!user) {
        return res.status(400).json({
            status: 400,
            message: 'Bad credentials provided!',
            data: null
        });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    
    if (!match) {
        return res.status(400).json({
            status: 400,
            message: 'Bad credentials provided!',
            data: null
        });
    }
    const accessToken = jwt.sign({
        email_id: user.email,
        user_id: user.id
    }, accessTokenSecret);

    return res.status(200).json({
        status: 200,
        message: 'logged in successfully!',
        data: {
            id: user.id,
            accessToken
        }
    });
}

exports.uploadFile = async (req, res) => {
    try {
        await fileUpload(req, res)
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }

    if (req.file == undefined) {
        return res.status(400).send({ 
            status: 400,
            message: "Please upload a file!",
            data: null 
        });
    }
    
    return res.status(200).send({ 
        status: 200,
        message: "file uploaded successfully!",
        data: null
    });
}

exports.getFiles = async (req, res) => {
    let fileInfos = [];
    let directoryPath = __basedir + "/uploads/";
    
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return res.status(500).send({
                status: 500,
                message: "Unable to scan files!",
            });
        }

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        return res.status(200).send(fileInfos);
    });
}

exports.deleteFile = async (req, res) => {
    var filePath = __basedir + '\\uploads\\' + req.query.file_name; 
    console.log(filePath)
    try {
        fs.unlinkSync(filePath);
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }

    return res.status(200).json({
        status: 200,
        message: 'file deleted successfully!'
    });
}

exports.downloadFileByCode = async (req, res) => {
    const verification_code = req.query.verification_code;
    const directoryPath = __basedir + '\\uploads\\'; 
    let found;

    fs.readdir(directoryPath, async function (err, files) {
        if (err) {
            return res.status(500).send({
                status: 500,
                message: err.message,
            });
        }

        if (files.length > 0) {
            found = files.filter(file => verification_code == parseInt(file.split("_").pop()));
        }

        if (found.length <= 0) {
            return res.status(404).send({
                status: 404,
                message: "file was not found!",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "file downloaded successfully!",
            data: {
                download_url: baseUrl + found[0]
            }
        });
    });
}