import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create } from "../controllers/post.controller.js";

const router = express.Router();

router.route("/create").post(verifyToken, create);

export default router;
