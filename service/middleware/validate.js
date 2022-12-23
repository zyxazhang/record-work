// 检验参数
const VALIDATE = (req, res, next) => {
  const method = req.method
  const query = req.query
  const body = req.body
  const fields = {}
  if (method === 'GET') {
    filterParams(query, fields)
  } else {
    filterParams(body, fields)
  }
  const result = judgeParams(fields)
  if (result.isOk) {
    next()
  } else {
    return res.cc(`参数${result.deficiency}的值不为空`, 200)
  }
}
const filterParams = (params, fields) => {
  Object.keys(params).forEach(item => {
    if (params[item].constructor === Object) {
      filterParams(params[item], fields)
    } else {
      const obj = {}
      obj[item] = params[item]
      Object.assign(fields, { ...obj })
    }
  })
}
const judgeParams = fields => {
  const isOk = Object.keys(fields).every(item => fields[item] !== '')
  let deficiency = ' '
  if (!isOk)
    Object.keys(fields).forEach(item => {
      if (fields[item] === '') {
        deficiency += item + ' '
      }
    })
  return {
    isOk,
    deficiency
  }
}
module.exports = {
  VALIDATE
}