import express from "express";
const router: express.IRouter = express.Router();
import {
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
  GET_USER_INFO,
  GET_USER_SETTINGS,
} from "../controller/user";

// 获取记录详情
router.post("/login", USER_LOGIN);
router.post("/logout", USER_LOGOUT);
router.post("/register", USER_REGISTER);
router.get("/info/:id", GET_USER_INFO);
router.get("/settings/:id", GET_USER_SETTINGS);

export default router;
