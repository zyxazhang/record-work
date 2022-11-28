const express = require('express')
const router = express.Router()
const { GET_RECORD_DETAIL } = require('../controller/record') 

// 获取记录详情
router.get('/detail', GET_RECORD_DETAIL)


module.exports = router