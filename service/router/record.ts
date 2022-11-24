import express from 'express'
const router:express.IRouter = express.Router()
import { GET_RECORD_DETAIL } from '../controller/record'

// 获取记录详情
router.get('/detail/:id', GET_RECORD_DETAIL)

export default router