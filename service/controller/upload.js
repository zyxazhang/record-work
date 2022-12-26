const express = require("express");
// const db = require('../model/index.js')
const router = express.Router();
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static/images");
  },
  filename: (req, file, cb) => {
    const filename =
      file.originalname.split(".")[0] +
      new Date().getTime() +
      "." +
      file.originalname.split(".")[1];
    cb(null, filename);
  },
});
const upload = multer({
  storage,
});
// 编辑器图片上传
router.post("/file", upload.single("file"), (req, res) => {
  try {
    if (!req.file) return res.cc('上传失败', 200);
    const url = 'http://' + req.headers.host + '/' + req.file.destination + "/" + req.file.filename;
    res.cc('success', 200, { url }, 1)
  } catch (error) {
    console.log(error, "upload");
  }
});
module.exports = router;
