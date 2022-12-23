const query = require('../model/index')
class InitUser {
  constructor(useId) {
    this.u_id = useId // 用户id
    this.isOver = this.computeIsOver(this.u_id) // 初始化流程是否结束
  }
  async computeIsOver(useId) {
    const res = await Promise.all([this.lucky(useId)])
    if (!res.every(item => item)) {
      this.deleteAccessId(useId)
      return false
    }
    return true
  }
  async lucky(uid) {
    const sql = 'INSERT INTO lucky SET ?'
    const defaultParams = {
      uid,
      count: 5,
      prize: '',
      is_join: false
    }
    const res = await query(sql, defaultParams)
    return res.affectedRows === 1
  }
  deleteAccessId(useId) {
    // 表名
    const fromNames = [
      'users',
      'lucky'
    ]
    // 创建用户初始化数据失败，清除该流程已创建的默认表单数据
    const sqlList = fromNames.map(item => `DELETE FROM ${item} WHERE ${item === 'users' ? 'id' : 'uid'}=?`)
    sqlList.forEach(async item => {
      await query(item, useId)
    })
  }
}

module.exports = InitUser