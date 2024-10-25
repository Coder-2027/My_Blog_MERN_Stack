import { Comment } from "../models/comment.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createComment = async (req, res, next) => {
  // console.log("Inside create comment");
  // console.log(req.body.userId/);
  try {
    const { content, postId, userId } = req.body;

    if (userId != req.user.userId) {
      return next(errorHandler(403, "You are not allowed to create a comment"));
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    await newComment.save();

    return res.status(200).json({
      success: true,
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      comments: comments,
    });
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "commentnot found"));
    }
    const userIndex = comment.likes.indexOf(req.user.userId);
    if (userIndex == -1) {
      comment.likes.push(req.user.userId);
      comment.numberOfLikes += 1;
      await comment.save();
      // console.log();
      return res.status(200).json({
        success: true,
        message: "Comment liked successfully",
        comment: comment,
      });
    } else {
      comment.likes.splice(userIndex, 1);
      comment.numberOfLikes -= 1;
      await comment.save();
      // console.log();
      return res.status(200).json({
        success: true,
        message: "Comment disliked successfully",
        comment: comment,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.userId && req.user.isAdmin) {
      {
        return next(
          errorHandler(403, "You are not allowed to edit this comment")
        );
      }
    }
    const editedComment = await Comment.findByIdAndUpdate(req.params.commentId, {
      content:req.body.content,
    }, {new: true});

    return res.status(200).json({
      success: true,
      message: "Comment edited successfully",
      comment: editedComment,
    })
  } catch (error) {
    next(error);
  }
};
