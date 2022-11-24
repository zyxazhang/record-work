import express from 'express'
const router:express.IRouter = express.Router()
import record from './record'
import user from './user'

router.use('/record', record)
router.use('/user', user)


export default router