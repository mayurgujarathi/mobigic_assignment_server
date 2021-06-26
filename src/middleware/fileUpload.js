const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
// const __basedir =;
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads');
    },
    filename: (req, file, cb) => {
        console.log('__dirname', __basedir + '\\uploads');
        console.log(file.originalname);
        cb(null, file.originalname + '_' + Math.floor(100000 + Math.random() * 900000));
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware =  util.promisify(uploadFile);
module.exports = uploadFileMiddleware;