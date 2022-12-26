const express = require('express')
const app = express()

const path = require('path')
const cors = require('cors')
const route = require('./router/index')
const {send} = require('./middleware/send')
var { expressjwt: jwt } = require("express-jwt")
const config = require('./config/index')
const port = 3002;

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "./static")));
app.use('/',jwt({
    secret: config.jwtSecretKey,
    algorithms: config.algorithms,
    credentialsRequired: true
}).unless({
    path: config.path
}))

app.use(cors({
  "origin": "*",
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

app.use(send)
app.use("/v1", route);

app.listen(port, () => {
  console.log(`%c----- Project running in port ${port} ------`, 'color: green');
});
