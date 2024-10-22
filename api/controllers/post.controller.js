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

export const getPosts = async (req, res, next) => {
  // console.log("Hello");
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1:-1;
    const posts = await Post.find(
      {...(req.query.userId && {userId: req.query.userId}),
      ...(req.query.category && {userId: req.query.category}),
      ...(req.query.slug && {userId: req.query.slug}),
      ...(req.query.postId && {userId: req.query.postId}),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ]
      })}
    ).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit);

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    })

    return res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });

  } catch (error) {
    next(error);
  }
};