import { Request, Response, NextFunction } from 'express'
/*
  msg 信息
  code 状态码
  status 结果 0 | 1
  data 数据
*/
const send = (req: Request, res: any, next: NextFunction) => {
  res.cc = (msg: any, code: number, data: Array<any> = [], status: number = 0) => {
    res.status(code).json({
      code,
      result: Boolean(status),
      data,
      message: msg instanceof Error ? msg.message : msg
    })
  }
  next()
}
export default send