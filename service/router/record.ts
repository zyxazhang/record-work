import express from 'express'
const router:express.IRouter = express.Router()
import { GET_RECORD_DETAIL } from '../controller/record'

router.get('/detail/:id', GET_RECORD_DETAIL)

export default router