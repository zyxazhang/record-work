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

const UPDATE_PRIZE = (req, res, next) => {
  try {
  } catch (error) {
    return res.cc('失败', 200, error)
  }
}
const GET_PRIZE_LIST = (req, res, next) => {
  try {
  } catch (error) {
    return res.cc('失败', 200, error)
  }
}
const GET_USER_PRIZE_RESULT = (req, res, next) => {
  try {
  } catch (error) {
    return res.cc('失败', 200, error)
  }
}
const UPDATE_USER_PRIZE_RESULT = (req, res, next) => {
  try {
  } catch (error) {
    return res.cc('失败', 200, error)
  }
}

module.exports = {
  ADD_PRIZE,
  UPDATE_PRIZE,
  GET_PRIZE_LIST,
  GET_USER_PRIZE_RESULT,
  UPDATE_USER_PRIZE_RESULT
}