import express from "express";
import mongoose from "mongoose";

const Post_Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  tag: {
    type: [String],
    default: [],
  },
});

const Post_Model = mongoose.model("Post", Post_Schema);
export default Post_Model;
