const express = require('express')
const router = express.Router()

const record = require('./record')
const user = require('./user')
const lucky = require('./lucky')
const upload = require('../controller/upload')

router.use('/record', record)
router.use('/user', user)
router.use('/lucky', lucky)
router.use('/upload', upload)


module.exports = router