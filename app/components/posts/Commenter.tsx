"use client";
import React from "react";
import Input from "../form/Input";
import Button from "../Button";

import { useState, useCallback } from "react";
import { error } from "console";

interface CommenterProps {
  onAddComment: (commentData: string) => void;
}

const Commenter: React.FC<CommenterProps> = ({ onAddComment }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="flex gap-1">
      <Input
        placeholder="add comment"
        value={comment}
        error={error}
        onChange={(e) => {
          setError("");
          setComment(e.target.value);
        }}
      />

      <Button
        label="add"
        onClick={() => {
          if (comment) {
            setComment("");
            onAddComment(comment);
          } else {
            setError("Comment Empty!");
          }
        }}
      />
    </div>
  );
};

export default Commenter;
