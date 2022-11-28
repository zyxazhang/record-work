/*
  msg 信息
  code 状态码
  status 结果 0 | 1
  data 数据
*/
module.exports.send = (req, res, next) => {
  res.cc = (msg, code, data = [], status = 0) => {
    res.status(code).json({
      code,
      result: Boolean(status),
      data,
      message: msg instanceof Error ? msg.message : msg
    })
  }
  next()
}