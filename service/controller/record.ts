// import db from '../model/index'
import express from 'express'

export const GET_RECORD_DETAIL = (req: express.Request, res: express.Response, next:express.NextFunction) => {
    try {
        console.log('这是什么呢', req)
        res.send({
            data: [
                req.params
            ]
        })
        res.end()
    } catch (error) {
        console.log(error);
    }
}