import express from "express";
import Router from "express";
import {
  confirm_user,
  signin_user,
  signup_user,
} from "../controllers/signup_user.js";
import {
  confirm_user_valiadtion,
  sign_user_validation,
  signup_valiadtor,
} from "../middlewares/validations.js";

const router = Router();

router.post("/signup", signup_valiadtor, signup_user);
router.post("/confirm_user", confirm_user_valiadtion, confirm_user);
router.post("/sign", sign_user_validation, signin_user);


export default router;
