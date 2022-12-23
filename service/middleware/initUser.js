const db = require('../model/index')
const utils = require('util')
class initUser {
  constructor (useId) {
    this.u_id = useId
    this.isOver = false // 初始化流程是否结束
    // if (u_id) {
    //   this.isOver = true
    // }
  }
  async lucky(uid) {
    const sql = 'INSERT INTO lucky SET ?'
    const defaultParams = {
      uid: this.u_id,
      count: 5,
      prize: '',
      is_join: false
    }
    // utils.promisify()
    // db.query(sql, defaultParams, (err, ))
  }
}

module.exports = {
  initUser
}