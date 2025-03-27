import express from "express";
import Router from "express";
import {
  create_post,
  delete_user,
  get_all_post,
  update_post,
} from "../controllers/post.controller.js";
import {
  delete_and_update_validation,
  delete_post_validation,
  is_user_exists_and_valid,
  post_validations,
} from "../middlewares/validations.js";
const post_router = Router();

// Create Post
post_router.post(
  "/create",
  is_user_exists_and_valid,
  post_validations,
  create_post
);

// Update Post
post_router.put(
  "/update/:post_id",
  is_user_exists_and_valid,
  post_validations,
  delete_and_update_validation,
  update_post
);

//Delete Post
post_router.delete(
  "/delete/:post_id",
  is_user_exists_and_valid,
  delete_post_validation,
  delete_and_update_validation,
  delete_user
);

post_router.get("/all", get_all_post);

export default post_router;
