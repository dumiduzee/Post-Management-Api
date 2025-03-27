import express from "express";
import User_Model from "../models/user.model.js";
import Post_Model from "../models/post.model.js";

// Signup validations valiations
export const signup_valiadtor = (req, res, next) => {
  const { email, name, password, confirm_password } = req.body;
  if (!email || !name || !password || !confirm_password) {
    return res.status(400).json({
      status: true,
      message: "All fields are required",
    });
  }
  if (password !== confirm_password) {
    return res.status(400).json({
      status: false,
      message: "Password are not save",
    });
  }
  next();
};

// User verification valiations
export const confirm_user_valiadtion = async (req, res, next) => {
  const { email, verification_code } = req.body;
  if (!verification_code || !email) {
    return res
      .status(400)
      .json({ status: false, message: "All fields are required" });
  }
  if (verification_code.length !== 6) {
    return res.status(400).json({
      status: false,
      message: "verification code not valid",
    });
  }

  next();
};

// User Signin valiations
export const sign_user_validation = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "all fields are required!!",
    });
  }
  const user = await User_Model.findOne({ email });
  console.log(user);

  if (!user.isVerified) {
    return res.status(400).json({
      status: false,
      message: "Not verified user.. Please verify email",
    });
  }
  next();
};

//Check user existence
export const is_user_exists_and_valid = async (req, res, next) => {
  const { email } = req.body;
  const user = await User_Model.findOne({ email });

  if (!user || !email) {
    return res.status(404).json({
      status: false,
      message: "Unauthorized User",
    });
  }

  if (!user.isVerified) {
    return res.status(404).json({
      status: false,
      message: "You're not verified user please verify before create post",
    });
  }
  next();
};

// Posts validation
export const post_validations = (req, res, next) => {
  const { title, content, tag } = req.body;
  if (!title || !content || !tag || tag?.length == 0) {
    return res.status(400).json({
      status: false,
      message: "All fields are required!!",
    });
  }
  next();
};

//Post delete validation
export const delete_post_validation = (req, res, next) => {
  const { post_id } = req.params;
  if (!post_id) {
    return res
      .status(400)
      .json({ status: false, message: "Cant find post id" });
  }
  next();
};

export const delete_and_update_validation = async (req, res, next) => {
  const { post_id } = req.params;
  const { email } = req.body;
  try {
    const post = await Post_Model.findById(post_id);
    const { _id } = await User_Model.findOne({ email });

    if (String(post.author) !== String(_id)) {
      return res.status(400).json({
        status: false,
        message: "You are deleting another one post!!",
      });
    }
    next();
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
