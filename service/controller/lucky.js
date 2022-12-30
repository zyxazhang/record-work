const query = require("../model/index");


const ADD_PRIZE = async (req, res, next) => {
  try {
    const { prize_name, prize_img, range, prize_inventory } = req.body
    const params = {
      prize_name,
      prize_img,
      range: Number(range),
      prize_inventory: Number(prize_inventory)
    }
    const sql = 'INSERT INTO luckyPrize SET ?'
    const result = await query(sql, params)
    if (result.affectedRows === 1) {
      return res.cc(`${params.prize_name} 添加成功`, 200, [], 1)
    }
  } catch (error) {
    return res.cc('添加失败', 200, error)
  }
}

const UPDATE_PRIZE = async (req, res, next) => {
  try {
    
  } catch (error) {
    return res.cc('失败', 200, error)
  }
}
// 获取所有用户抽奖记录
const GET_USER_PRIZE_LIST = async (req, res, next) => {
  try {
    const sql = 'SELECT * FROM lucky'
    const result = await query(sql)
    return res.cc('success', 200, result, 1)
  } catch (error) {
    return res.cc('失败', 200, error)
  }
}
// 获取抽奖结果
const GET_USER_PRIZE_RESULT = async (req, res, next) => {
  try {
    const sql = 'SELECT * FROM lucky WHERE uid=?'
    const result = await query(sql, req.auth.id)
    return res.cc('success', 200, ...result, 1)
  } catch (error) {
    return res.cc('失败', 200, error)
  }
}
// 抽奖更新信息
const UPDATE_USER_PRIZE_RESULT = async (req, res, next) => {
  try {
    const useId = req.auth.id
    const sql = 'SELECT * FROM lucky WHERE uid=?'
    const preResult = await query(sql, useId)
    const { count, prize } = preResult[0]
    if (count === 0) {
      return res.cc('抽奖次数已用完！！', 200, { count }, 1)
    }
    // 扣除次数
    const userCount = Number(count) - 1
    // 已获得 prize
    const userPrize = prize === '' ? [] : prize.split(',')
    // 过滤已获得 prize
    const prizeIds = [1, 2, 3, 4, 5, 6, 7, 8].filter(item => !userPrize.includes(String(item)))
    // 随机
    const randomNum = Math.floor(Math.random() * prizeIds.length)
    userPrize.push(prizeIds[randomNum])
    // 需要更新参数 以数组传递
    const params = [userCount, userPrize.toString(), true, useId]
    const updateSql = 'UPDATE lucky SET count=?,prize=?,is_join=? WHERE uid=?'
    const updateResult = await query(updateSql, params)
    if (updateResult.affectedRows === 1) {
      return res.cc('success', 200, { prize: prizeIds[randomNum], count: userCount }, 1)
    }
  } catch (error) {
    return res.cc('失败', 200, error)
  }
}

module.exports = {
  ADD_PRIZE,
  UPDATE_PRIZE,
  GET_USER_PRIZE_LIST,
  GET_USER_PRIZE_RESULT,
  UPDATE_USER_PRIZE_RESULT
}