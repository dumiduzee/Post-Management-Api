import express from "express";
import User_Model from "../models/user.model.js";
import Post_Model from "../models/post.model.js";

// create Post
export const create_post = async (req, res) => {
  const { email, title, content, tag } = req.body;
  try {
    const user = await User_Model.findOne({ email });

    const post_model = new Post_Model({
      title,
      content,
      author: user._id,
      tag,
    });
    await post_model.save();
    res.status(201).json({
      status: true,
      message: "Post Uploaded!!",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

//update Post
export const update_post = async (req, res) => {
  const { title, content, tag } = req.body;
  const { post_id } = req.params;
  //check post vailable or not
  try {
    const post = await Post_Model.findById(String(post_id));
    if (!post) {
      res.status(404).json({ status: false, message: "Post not found" });
    }
    await Post_Model.findByIdAndUpdate(
      post._id,
      {
        title,
        content,
        tag,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );
    res.status(201).json({ status: true, message: "Post updated" });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

//Delete Post
export const delete_user = async (req, res) => {
  const { post_id } = req.params;
  try {
    await Post_Model.findByIdAndDelete(post_id);
    res.status(200).json({ status: true, message: "Post deleted successfull" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};
