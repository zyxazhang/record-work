const express = require('express')
const app = express()

const path = require('path')
const route = require('./router/index')
const {send} = require('./middleware/send')
var { expressjwt: jwt } = require("express-jwt")
const config = require('./config/index')
const port = 3002;

app.use(express.json());
app.use('/',jwt({
    secret: config.jwtSecretKey,
    algorithms: config.algorithms,
    credentialsRequired: true
}).unless({
    path: config.path
}))
app.use(send)
app.use("/static", express.static(path.join(__dirname, "./static")));
app.use("/v1", route);

app.listen(port, () => {
  console.log(`------Project running in port ${port}------`);
});
