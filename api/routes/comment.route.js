import express from "express";
import {createComment, getPostComments} from "../controllers/Comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.route("/create").post(verifyToken, createComment);
router.route('/getPostComments/:postId').get(getPostComments);

export default router;
