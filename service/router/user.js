const express = require('express')
const router = express.Router()
const {
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
  USER_UPDATE_PASSWORD,
  GET_USER_INFO,
  GET_USER_SETTINGS,
} = require('../controller/user')

// 获取记录详情
router.post("/login", USER_LOGIN);
router.post("/logout", USER_LOGOUT);
router.post("/update", USER_UPDATE_PASSWORD);
router.post("/register", USER_REGISTER);
router.get("/info", GET_USER_INFO);
router.get("/settings/:id", GET_USER_SETTINGS);

module.exports= router;
