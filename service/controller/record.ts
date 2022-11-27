import db from '../model/index'
import express from 'express'

export const GET_RECORD_DETAIL = (req: any, res: any, next:express.NextFunction) => {
    try {
        console.log(req.query)
        const { id } = req.query
        if (!id) return res.cc('未传入记录id', 200)
        const sql = 'SELECT * FROM article_details where id=?'
        db.query(sql, req.query.id, (err: any, result: any) => {
            if (err) res.cc(err, 500)
            res.cc('success', 200, result, 1)
        })
    } catch (error) {
        console.log(error);
    }
}