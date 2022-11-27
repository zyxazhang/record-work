import express from "express";
import route from "./router/index";
import path from "path";
import send from './middleware/send'
import {expressjwt as jwt} from 'express-jwt'
import config from './config/index'
const app: express.Application = express();
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
