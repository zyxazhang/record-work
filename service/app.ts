import express from 'express'
import route from './router/index'
import path from 'path'

const app:express.Application = express()
const port = 3002

app.use(express.json())
app.use('/static', express.static(path.join(__dirname, './static')))
app.use('/v1', route)

app.listen(port, () => {
    console.log(`------Project running in port ${port}------`);
})
