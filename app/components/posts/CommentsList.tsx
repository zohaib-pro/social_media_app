import React, { useState } from "react";
import { Comment, User } from "@prisma/client";
import Commenter from "./Commenter";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Font Awesome icons for arrow

interface CommentsListProps {
  comments: Comment[];
  postId: number;
}

interface CommentPlusAuthor extends Comment {
  author: User;
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments: _comments,
  postId,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [comments, setComments] = useState(_comments);

  const handleToggleComments = () => {
    setShowAll(!showAll);
  };

  // Split comments into first comment and the rest
  const [firstC, ...restComments] = comments;

  const firstComment = firstC as CommentPlusAuthor;

  return (
    <div className="mt-4">
      <h2 className="text-white text-lg font-semibold mb-2">
        Comments: <span className="">{comments.length}</span>
      </h2>

      {comments.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          {/* Render the first comment if it exists */}
          {firstComment && (
            <li key={firstComment.id}>
              <span className="font-semibold">{firstComment.author.name}:</span>{" "}
              {firstComment.content}
            </li>
          )}

          {/* Conditionally render the rest of the comments */}
          {showAll &&
            restComments.map((c) => {
              const comment = c as CommentPlusAuthor;
              return (
                <li key={c.id}>
                  <span className="font-semibold">{comment.author.name}:</span>{" "}
                  {c.content}
                </li>
              );
            })}
        </ul>
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}

      {/* Toggle button with arrow icon */}
      {comments.length > 1 && (
        <button
          onClick={handleToggleComments}
          className="mt-2 flex items-center text-blue-500 hover:underline"
        >
          {showAll ? (
            <>
              <FaChevronUp className="mr-2" />
              Hide Comments
            </>
          ) : (
            <>
              <FaChevronDown className="mr-2" />
              Show All Comments
            </>
          )}
        </button>
      )}

      <Commenter
        postId={postId}
        onAddComment={(comment) => {
          setComments([comment, ...comments]);
        }}
      />
    </div>
  );
};

export default CommentsList;
