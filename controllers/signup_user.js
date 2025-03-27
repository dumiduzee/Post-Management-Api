import express from "express";
import bcrypt from "bcrypt";
import User_Model from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Signup user function
export const signup_user = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  try {
    const hashed_password = await bcrypt.hash(password, 10);
    console.log(hashed_password, email);

    if (await User_Model.findOne({ email, hashed_password })) {
      return res.status(401).json({
        status: false,
        message: "This user already exists!!",
      });
    }
    const user_model = new User_Model({
      email,
      name,
      hashed_password,
    });
    const user = await user_model.save();
    return res.status(201).json({
      status: true,
      message: `Account created success!! your verification code is - ${user.verify_otp} at that expires in - ${user.verify_otp_expire_at}`,
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: error.message,
    });
  }
};

// Verify user funtion
export const confirm_user = async (req, res) => {
  const { email, verification_code } = req.body;
  try {
    let user = await User_Model.findOne({ email });
    if (user.isVerified === true) {
      return res.status(400).json({
        status: false,
        message: "User alrady verified!",
      });
    }

    // check if user if exists or not
    console.log(email, verification_code);

    user = await User_Model.findOne({
      email,
      verify_otp: verification_code,
    });
    if (!user) {
      return res.status(400).json({ status: false, message: "Not valid user" });
    }
    if (user.verify_otp !== verification_code && user.verify_otp < Date.now()) {
      return res.status(400).json({
        status: false,
        message: "Verification Code Not Correct or expired!",
      });
    }

    user.verify_otp = undefined;
    user.isVerified = true;
    user.verify_otp_expire_at = undefined;
    await user.save();
    return res.status(200).json({
      status: true,
      message: "User verified!!",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

//Sign user
export const signin_user = async (req, res) => {
  const { email, password } = req.body;
  const user = await User_Model.findOne({
    email,
  });
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User not found!!",
    });
  }
  const password_match = await bcrypt.compare(password, user.hashed_password);

  if (!password_match) {
    return res.status(400).json({
      status: false,
      message: "Entered Password is wrong!!",
    });
  }
  return res.status(200).json({
    status: false,
    message: "User signin success!!",
  });
};
