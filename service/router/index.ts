import express from 'express'
const router:express.IRouter = express.Router()
import record from './record'

router.use('/record', record)


export default router