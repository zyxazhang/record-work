const express = require('express')
// const db = require('../model/index.js')
const router = express.Router()
const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({
    // dest: 'public/uploads',
    storage
})
// 编辑器图片上传
router.post('/file', upload.single('file'), (req, res) => {
    try {
        const url = req.file.destination + '/' + req.file.filename
        res.send({
            result: 'sucess',
            img: url
        })
    } catch (error) {
        console.log(error, 'upload');
    }
})
module.exports = router

