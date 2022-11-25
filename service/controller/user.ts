import { Request, Response, NextFunction } from 'express'
import db from '../model/index'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/index'
// 用户登录
export const USER_LOGIN = (req: any, res: any, next: NextFunction) => {
  try {
    console.log(req.user)
    const { username, password } = req.body
    const queryUserStr = 'SELECT * FROM users WHERE username=?'
    db.query(queryUserStr, username, (err: any, result: any) => {
      if (err) res.cc(err, 500)
      if (result.length !== 1) res.cc('用户名或密码错误', 200)
      const _password = bcrypt.compareSync(password, result[0].password)
      if (!_password) res.cc('密码错误', 200)
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
interface Iresult {
  username?: string
}
export const USER_REGISTER = (req: any, res: any, next: NextFunction) => {
  try {
    const { username, password } = req.body
    const queryName = 'SELECT username FROM users WHERE username=?'
    db.query(queryName, username, (err: any, result: Array<Iresult>) => {
      if (err) {
        res.cc('Query failure', 500)
      }
      if (result.length <= 0) {
        req.body.password = bcrypt.hashSync(password, 10)
        const registerStr = 'INSERT INTO users SET ?'
        db.query(registerStr, req.body, (err: any, result: any) => {
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
  } catch (error) {
    next(error)
  }
}
// 用户注销
export const USER_LOGOUT = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    data: req.params
  })
}
// 用户信息
export const GET_USER_INFO = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    data: req.params
  })
}
// 用户设置
export const GET_USER_SETTINGS = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    data: req.params
  })
}
