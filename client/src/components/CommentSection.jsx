import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Textarea, Button, Alert } from "flowbite-react";
import Comment from "./Comment";

function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  // console.log(comments);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setCommentError(null);
      if (comment.length > 200) {
        return;
      }
      const res = await fetch("/api/v1/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();
        // console.log(data);
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data.comment, ...comments]);
      }
    } catch (error) {
      console.log(error.message);
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/v1/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          // console.log(data);
          setComments(data.comments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            src={currentUser.profilePicture}
            alt=""
            className="h-5 w-5 object-cover rounded-full"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must Login to comment
          <Link to={"/signin"} className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          className="border border-teal-500 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5 ">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="danger" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments?.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="flex items-center gap-5 mt-5">
            <p className="">Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-md">
              <p>{comments?.length}</p>
            </div>
          </div>
          {comments?.map((comment) => (
            <Comment key={comment._id} comment={comment}/>
          ))}
        </>
      )}
    </div>
  );
}

export default CommentSection;
