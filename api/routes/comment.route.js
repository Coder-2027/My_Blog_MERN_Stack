import express from "express";
import {createComment} from "../controllers/Comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.route("/create").post(verifyToken, createComment);

export default router;
