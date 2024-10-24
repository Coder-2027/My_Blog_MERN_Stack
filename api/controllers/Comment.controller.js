import { Comment } from "../models/comment.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createComment = async(req, res, next) => {
    // console.log("Inside create comment");
    // console.log(req.body.userId/);
    try {
        const {content, postId, userId} = req.body;

        if(userId != req.user.userId){
            return next(errorHandler(403, "You are not allowed to create a comment"));
        }

        const newComment = new Comment({
            content,
            postId,
            userId
        });

        await newComment.save();

        return res.status(200).json({
            success: true,
            message: "Comment created successfully",
            comment: newComment
        })
    } catch (error) {
        next(error)
    }
};

export const getPostComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({postId: req.params.postId}).sort({createdAt: -1,});

        return res.status(200).json({
            success: true,
            comments: comments
        })
    } catch (error) {
        next(error);
    }
}