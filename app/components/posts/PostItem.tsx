import { Post, User } from "@prisma/client";
import React, { useState } from "react";

interface PostItemProps {
  _post: Post;
}

interface PostPlusAuthor extends Post {
  author: User;
  comments: string[];
}

const PostItem: React.FC<PostItemProps> = ({ _post }) => {
  // Example state to manage likes (you might want to manage likes server-side)
  const [likes, setLikes] = useState(0);

  const post = _post as PostPlusAuthor;
  // Function to handle like button click
  const handleLike = () => {
    setLikes(likes + 1);
    // Here you would also want to update the like count server-side
  };

  return (
    <div
      key={post.id}
      className="bg-neutral-800 p-4 rounded-xl shadow-lg mb-4 max-w-2xl mx-auto"
    >
      {/* Post Header */}
      <div className="flex items-start space-x-3 mb-4">
        <img
          src={post.author?.profileImage || "/images/placeholder.png"}
          alt={post.author?.name || "Profile"}
          className="w-12 h-12 rounded-full object-cover"
        />
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
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 text-gray-300">
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 hover:text-blue-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{likes}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-400 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2v12.11a4.992 4.992 0 0 0-1-.11c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.09 0 2.09-.4 2.88-1.05A5.988 5.988 0 0 0 14 18v4h4v-4h-2v-2h2V4h-4z" />
          </svg>
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-4">
        <h2 className="text-white text-lg font-semibold mb-2">Comments:</h2>
        {/* You can map over comments if you have them */}
        {post.comments && post.comments.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            {post.comments.map((comment) => (
              <div>
                {/* <li key={comment.id}>
                  <span className="font-semibold">{comment.authorName}:</span>{" "}
                  {comment.text}
                </li> */}
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostItem;
