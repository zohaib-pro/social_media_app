import { Post } from "@prisma/client";
import React, { useState } from "react";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div key={post.id}>
      <h1 className="text-white">
        {post.content} by{" "}
        <span className="text-red-600">{post.author?.name}</span>
        <span className="text-green-500">@{post.createdAt}</span>
      </h1>
    </div>
  );
};

export default PostItem;
