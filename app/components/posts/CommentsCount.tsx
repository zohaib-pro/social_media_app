import React from "react";

import { FaRegCommentDots } from "react-icons/fa6";

interface CommentsCountProps {
  count: number;
}

const CommentsCount: React.FC<CommentsCountProps> = ({ count }) => {
  return (
    <div className="text-sky-500">
      <button className="flex items-center space-x-1 hover:text-blue-400 transition">
        <FaRegCommentDots size={20} />
        <span className="text-xl">{count}</span>
      </button>
    </div>
  );
};

export default CommentsCount;
