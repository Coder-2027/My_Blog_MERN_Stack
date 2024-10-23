import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getPosts, deletePost } from "../controllers/post.controller.js";

const router = express.Router();

router.route("/create").post(verifyToken, create);
router.route('/getPosts').get(getPosts);
router.route('/deletePost/:postId/:userId').delete(verifyToken, deletePost);

export default router;
