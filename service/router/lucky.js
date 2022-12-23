// lucky
/*
  u_id 用户绑定lucky id
*/
const express = require("express");
const router = express.Router();

const { VALIDATE } = require('../middleware/validate')

const {
  ADD_PRIZE,
  UPDATE_PRIZE,
  GET_PRIZE_LIST,
  GET_USER_PRIZE_RESULT,
  UPDATE_USER_PRIZE_RESULT
} = require('../controller/lucky')

// 添加奖品
router.post('/prize', VALIDATE, ADD_PRIZE)
// 添加奖品
router.patch('/prize', VALIDATE, UPDATE_PRIZE)
// 查看奖品
router.get('/prize/list', GET_PRIZE_LIST)
// 获取用户抽奖信息
router.get('/prizer/:u_id', GET_USER_PRIZE_RESULT)
// 更新用户抽奖信息
router.patch('/update/prizer', UPDATE_USER_PRIZE_RESULT)

module.exports = router