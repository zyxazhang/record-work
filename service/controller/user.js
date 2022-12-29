const query = require('../model/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/index')
const InitUser = require('../middleware/initUser')
const { Item } = require('ant-design-vue/lib/menu')
// 用户登录
exports.USER_LOGIN = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const queryUserStr = 'SELECT * FROM users WHERE username=?'

    const result = await query(queryUserStr, username)
    if (result.length !== 1) return res.cc('用户名或密码错误', 200)

    const _password = bcrypt.compareSync(password, result[0].password)
    if (!_password) return res.cc('密码错误', 200)

    const user = {...result[0], password: '', user_pic: ''}
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn})
    result[0].token = 'Bearer ' + tokenStr
    res.cc('登录成功', 200, result[0], 1)
  } catch (error) {
    return res.cc('异常错误', 200, error)
  }
}
// 用户注册
exports.USER_REGISTER = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const queryName = 'SELECT username FROM users WHERE username=?'
    const result = await query(queryName, username)
    if (result.length <= 0) {
      req.body.password = bcrypt.hashSync(password, 10)
      const params = {
        sex: 1,
        picture: '',
        create_time: new Date(),
        auth_field: '',
        ...req.body
      }
      const registerStr = 'INSERT INTO users SET ?'
      const registerResult = await query(registerStr, params)
      if (registerResult.affectedRows === 1) {
        const initUser = new InitUser(registerResult.insertId, username)
        if (await initUser.isOver) {
          return res.cc('注册成功', 200, { ...result }, 1)
        } else {
          return res.cc('初始化错误', 200)
        }
      }
    } else {
      return res.cc('该用户名已存在', 200)
    }
  } catch (error) {
    return res.cc('注册失败，服务器异常', 500, error)
  }
}
// 用户注销
exports.USER_LOGOUT = async (req, res, next) => {
  try {
    const deleteStr = 'DELETE FROM users WHERE id=?'
    const result = await query(deleteStr, req.auth.id)
    if (result.affectedRows === 1) {
     return res.cc('注销成功', 200, { ...result }, 1)
    }
  } catch (error) {
    return res.cc('Query failure', 500, error)
  }
}
// 修改密码
exports.USER_UPDATE_PASSWORD = async (req, res, next) => {
  try {
    const queryArr= [req.body.np, req.auth.id]
    const changeStr = 'UPDATE users SET password=? WHERE id=?'
    const result = await query(changeStr, queryArr)
    if (result.affectedRows === 1) {
      res.cc('修改密码成功', 200, { ...result }, 1)
    }
  } catch (error) {
    return res.cc('修改失败，服务器异常', 500, error)
  }
}
// 用户信息
exports.GET_USER_INFO = async (req, res, next) => {
  try {
    const id = req.auth.id
    const queryStr = 'SELECT * FROM users WHERE id=?'
    const result = await query(queryStr, id)
    if (result.length !== 0) {
      result.forEach(item => {
        delete item.password
      });
      return res.cc('success', 200, ...result, 1)
    } else {
      res.cc('查询用户失败', 200)
    }
  } catch (error) {
    return res.cc('查询失败，服务器异常', 500, error)
  }
}
// 用户设置
exports.GET_USER_SETTINGS = (req, res, next) => {
  res.json({
    data: req.params
  })
}
