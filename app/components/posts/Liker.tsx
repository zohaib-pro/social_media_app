import usePost from "@/app/hooks/fetcher";
import { RootState } from "@/app/store/store";
import { Like } from "@prisma/client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

interface LikerProps {
  postId: Number;
  likes: Like[];
}

const Liker: React.FC<LikerProps> = ({ likes: _likes, postId }) => {
  const isUpdated = useRef(false);
  const thisUser = useSelector((state: RootState) => state.thisUser);
  const [likes, setLikes] = useState(_likes || []);
  const [isLiked, setLiked] = useState(false);

  const {
    data: likeResults,
    loading,
    error,
    post: postLike,
  } = usePost("api/posts/like/" + postId);
  const handleClick = useCallback(() => {
    postLike({ postId });
    isUpdated.current = false;
    setLiked(!isLiked);
  }, [setLiked, isLiked, postLike, postId]);

  useEffect(() => {
    if (isUpdated.current) return;
    if (likeResults) {
      const toRemove = !isLiked;
      if (toRemove) {
        setLikes(likes.filter((i) => i.userId != thisUser?.data?.id));
      } else {
        const newLike = likeResults as Like;
        setLikes([...likes, newLike]);
      }
      isUpdated.current = true;
    }

    if (error) {
      toast.error("Failed to like!");
    }
  }, [isLiked, likeResults, error, setLikes, thisUser.data]);

  useEffect(() => {
    if (
      thisUser.data &&
      likes.find((i) => i.postId == postId && i.userId == thisUser?.data?.id)
    ) {
      setLiked(true);
    }
  }, [thisUser.data]);
  return (
    <div className="text-sky-500">
      <button
        className="flex items-center space-x-1 hover:text-blue-400 transition"
        onClick={handleClick}
      >
        {isLiked ? <FaHeart size={28} /> : <FaRegHeart size={28} />}
        <span className="text-2xl">{likes.length}</span>
      </button>
    </div>
  );
};

export default Liker;
