const db = require('../model/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/index')
// 用户登录
exports.USER_LOGIN = (req, res, next) => {
  try {
    const { username, password } = req.body
    const queryUserStr = 'SELECT * FROM users WHERE username=?'
    db.query(queryUserStr, username, (err, result) => {
      if (err) return res.cc(err, 500)
      if (result.length !== 1) return res.cc('用户名或密码错误', 200)
      const _password = bcrypt.compareSync(password, result[0].password)
      if (!_password) return res.cc('密码错误', 200)
      const user = {...result[0], password: '', user_pic: ''}
      const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn})
      result[0].token = 'Bearer ' + tokenStr
      res.cc('登录成功', 200, result[0], 1)
    })
  } catch (error) {
    next(error)
  }
}
// 用户注册
exports.USER_REGISTER = (req, res, next) => {
  try {
    const { username, password } = req.body
    const queryName = 'SELECT username FROM users WHERE username=?'
    db.query(queryName, username, (err, result) => {
      if (err) {
        return res.cc('Query failure', 500)
      }
      if (result.length <= 0) {
        req.body.password = bcrypt.hashSync(password, 10)
        const params = {
          sex: 1,
          picture: '',
          create_time: new Date(),
          auth_field: ''
        }
        const registerStr = 'INSERT INTO users SET ?'
        db.query(registerStr, req.body, (err, result) => {
          if (err) {
            res.cc('注册失败', 500, err)
          }
          if (result.affectedRows === 1) {
            res.cc('注册成功', 200, { ...result }, 1)
          }
        })
      } else {
        res.cc('该用户已存在', 200)
      }
    })
  } catch (err) {
    next(err)
  }
}
// 用户注销
exports.USER_LOGOUT = (req, res, next) => {
  const deleteStr = 'DELETE FROM users WHERE id=?'
  db.query(deleteStr, req.auth.id, (err, result) => {
    if (err) {
      return res.cc('Query failure', 500)
    }
    if (result.affectedRows === 1) {
      res.cc('注销成功', 200, { ...result }, 1)
    }
  })
}
// 修改密码
exports.USER_UPDATE_PASSWORD = (req, res, next) => {
  try {
    const queryArr= [req.body.np, req.auth.id]
    const changeStr = 'UPDATE users SET password=? WHERE id=?'
    db.query(changeStr, queryArr, (err, result) => {
      if (err) {
        return res.cc('Query failure', 500)
      }
      if (result.affectedRows === 1) {
        res.cc('修改密码成功', 200, { ...result }, 1)
      }
    })
  } catch (err) {
    console.log(err)
  }
}
// 用户信息
exports.GET_USER_INFO = (req, res, next) => {
  try {
    const id = req.auth.id
    const queryStr = 'SELECT id,username,sex FROM users WHERE id=?'
    db.query(queryStr, id, (err, result) => {
      if (err) {
        return res.cc('Query failure', 500)
      }
      if (result.length !== 0) {
        res.cc('success', 200, ...result, 1)
      }
    })
  } catch (err) {
    console.log(err)
  }
}
// 用户设置
exports.GET_USER_SETTINGS = (req, res, next) => {
  res.json({
    data: req.params
  })
}
