const express = require("express");
const router = express.Router();
const {
  CREATE_RECORD,
  GET_RECORD_DETAIL,
  SET_RECORD_LIST,
  GET_RECORD_LIST,
  DELETE_RECORD
} = require("../controller/record");

// 获取记录详情
router.post("/create", CREATE_RECORD, SET_RECORD_LIST);
router.get("/detail", GET_RECORD_DETAIL);
router.delete("/delete", DELETE_RECORD);
router.get("/list", GET_RECORD_LIST);

module.exports = router;
