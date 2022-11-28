const db = require('../model/index')

exports.GET_RECORD_DETAIL = (req, res, next) => {
    try {
        console.log(req.query)
        const { id } = req.query
        if (!id) return res.cc('未传入记录id', 200)
        const sql = 'SELECT * FROM article_details where id=?'
        db.query(sql, req.query.id, (err, result) => {
            if (err) res.cc(err, 500)
            res.cc('success', 200, result, 1)
        })
    } catch (error) {
        console.log(error);
    }
}