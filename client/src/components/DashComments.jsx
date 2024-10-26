import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showmore, setShowmore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  const handleDeleteComment = async () => {
    // console.log(userIdToDelete);
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/v1/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/v1/comment/getComments`, {
          method: "GET",
        });
        // console.log(res);
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setComments(data.comments);
          // console.log(data.posts.length);
          if (data.comments.length < 9) {
            setShowmore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowmore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/v1/comment/getComments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowmore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md text-center">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Number of Likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {comments.map((post) => (
                <Table.Row
                  key={post._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>
                    {/* <Link to={`/post/${post.slug}`}> */}
                    {post.content}
                    {/* </Link> */}
                  </Table.Cell>

                  <Table.Cell>
                    {/* <Link */}
                    {/* to={`/post/${post.slug}`}
                      className="font-medium text-gray-900 dark:text-white" */}
                    {/* > */}
                    {post.numberOfLikes}
                    {/* </Link> */}
                  </Table.Cell>

                  <Table.Cell>{post.postId}</Table.Cell>
                  <Table.Cell>{post.userId}</Table.Cell>

                  <Table.Cell>
                    <span
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(post._id);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      ) : (
        <div className="text-center">You have no comments yet</div>
      )}
      {showmore && (
        <button
          className="w-full text-teal-500 self-center text-sm py-7"
          onClick={handleShowmore}
        >
          Show More ...
        </button>
      )}

      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this Comment ?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteComment}>
                  Yes I am sure
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default DashComments;
