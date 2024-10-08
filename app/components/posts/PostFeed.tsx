"use client";
import React, { useEffect, useRef, useState } from "react";
import { Post } from "@prisma/client";
import { useGet } from "@/app/hooks/fetcher";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/app/store/slices/PostsSlice";
import PostItem from "./PostItem";
import { useSession } from "next-auth/react";
import { RootState } from "@/app/store/store";
import { ClipLoader } from "react-spinners";

const PostFeed = () => {
  const { data: posts, loading, error } = useGet<Post[]>("/api/posts");
  const dispatch = useDispatch();
  console.log("refreshed");
  const initialLoad = useRef(true);

  const postsState = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (posts && initialLoad.current) {
      dispatch(setPosts(posts));
      initialLoad.current = false;
    }
  }, [posts, dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white">
        <h1>Error fetching posts: {error.message}</h1>
      </div>
    );
  }

  if (postsState.data.length === 0) {
    return (
      <div className="text-white">
        <h1>No Posts Yet!</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto text-white p-1">
        {postsState.data.map((post) => (
          <PostItem key={post.id} _post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
