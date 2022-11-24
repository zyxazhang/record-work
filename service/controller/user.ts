import { Request, Response, NextFunction } from 'express'
// 用户登录
export const USER_LOGIN = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    data: req.params
  })
}
// 用户注册
export const USER_REGISTER = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    data: req.params
  })
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
