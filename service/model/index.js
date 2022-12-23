const mysql = require('mysql2')
const pool = mysql.createPool({
  host: "114.132.201.39",
  user: "test-last",
  password: "z123456",
  database: "test-last",

})
function query(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      connection.query(sql, values, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
        connection.release()
      })
    })
  })
}

module.exports = query
