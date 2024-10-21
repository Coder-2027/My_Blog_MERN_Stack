import { errorHandler } from "../utils/errorHandler.js";
import { Post } from "../models/post.model.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide a title and content"));
  }

  const slug = req.body.title.split(" ").join("-").toLowerCase();

  try {
    const newPost = await Post.create({
      ...req.body,
      slug,
      userId: req.user.userId,
    });
    return res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
