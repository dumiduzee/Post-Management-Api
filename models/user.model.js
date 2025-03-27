import express from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import { type } from "os";

const User_Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: [5, "Email must be higher than 5 characters"],
  },
  name: {
    type: String,
    required: true,
    minLength: [5, "name must be higher than 5 characters"],
  },
  hashed_password: {
    type: String,
    default: "",
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  verify_otp: {
    type: String,
    default: "",
  },
  verify_otp_expire_at: {
    type: Date,
    default: undefined,
  },
});

User_Schema.pre("save", function (next) {
  if (this.verify_otp === "" && this.verify_otp_expire_at == undefined) {
    this.verify_otp = crypto.randomBytes(3).toString("hex");
    this.verify_otp_expire_at = Date.now() + 3600000;
  }
  next();
});

const User_Model = mongoose.model("User", User_Schema);

export default User_Model;
