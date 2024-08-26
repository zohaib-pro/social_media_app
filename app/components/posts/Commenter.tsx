"use client";
import React, { useEffect } from "react";
import Input from "../form/Input";
import Button from "../Button";

import { useState, useCallback } from "react";
import { error } from "console";
import usePost from "@/app/hooks/fetcher";
import { Comment } from "@prisma/client";
import toast from "react-hot-toast";

interface CommenterProps {
  postId: Number;
  onAddComment: (commentData: Comment) => void;
}

const Commenter: React.FC<CommenterProps> = ({ onAddComment, postId }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const {
    data: commentResults,
    error: commentingError,
    post: postComment,
    loading,
  } = usePost("/api/posts/comment");

  useEffect(() => {
    if (commentResults && !commentingError) {
      toast.success("Comment Added");
      const newComment = commentResults as Comment;
      setComment("");
      onAddComment(newComment);
    }

    if (commentingError) {
      toast.error("Failed to add comment!");
    }
  }, [commentResults, commentingError]);

  return (
    <div className="flex gap-1">
      <Input
        placeholder="add comment"
        value={comment}
        error={error}
        disabled={loading}
        onChange={(e) => {
          setError("");
          setComment(e.target.value);
        }}
      />

      <Button
        label="add"
        disabled={loading}
        onClick={() => {
          if (comment) {
            postComment({ postId, content: comment });
          } else {
            setError("Comment Empty!");
          }
        }}
      />
    </div>
  );
};

export default Commenter;
