import { Comment, Post, User, Like } from "@prisma/client";
import React, { useCallback, useState } from "react";
import Input from "../form/Input";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Button from "../Button";
import Commenter from "./Commenter";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import CommentsList from "./CommentsList";
import Avatar from "../users/Avatar";
import AutoImage from "../AutoImage";
import Liker from "./Liker";
import CommentsCount from "./CommentsCount";

interface PostItemProps {
  _post: Post;
}

interface PostPlus extends Post {
  author: User;
  comments: Comment[];
  likes: Like[];
}

const PostItem: React.FC<PostItemProps> = ({ _post }) => {
  const post = _post as PostPlus;
  const [commentsCount, setCommentsCount] = useState(post.comments.length);

  return (
    <div
      key={post.id}
      className="bg-neutral-800 p-4 rounded-xl shadow-lg mb-4 max-w-2xl mx-auto"
    >
      {/* Post Header */}
      <div className="flex items-start space-x-3 mb-4">
        <Avatar user={post.author} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-white text-lg font-semibold">
              {post.author?.name || "Unknown User"}
            </h1>
            <p className="text-gray-400 text-sm">
              <span>@{new Date(post.createdAt).toLocaleDateString()}</span>
            </p>
          </div>

          {/* Post Content */}
          <p className="text-white text-base mb-3">{post.content}</p>

          {/* Post Image */}
          {post.image && (
            <img
              src={post.image}
              alt={post.content}
              className="w-full object-cover rounded-xl mb-4"
            />
            // <AutoImage src={post.image} alt={"Post"} />
            // <Image
            //   className="w-full object-cover"
            //   layout="responsive"
            //   style={{}}
            //   alt="post image"
            //   src={post.image || "/images/placeholder.png"}
            // />
          )}
        </div>
      </div>

      <div className="flex flex-row gap-5">
        <Liker postId={post.id} likes={post.likes} />
        <CommentsCount count={commentsCount} />
      </div>
      <CommentsList
        postId={post.id}
        comments={post.comments}
        onNewComment={setCommentsCount}
      />
    </div>
  );
};

export default PostItem;
