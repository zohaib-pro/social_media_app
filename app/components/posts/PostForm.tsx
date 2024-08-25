"use client";
import { Post, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "../Avatar";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../store/slices/PostsSlice";

import ImageUpload from "../form/ImageUpload";
import usePost from "@/app/hooks/fetcher";
import { RootState } from "@/app/store/store";

interface PostFormProps {
  placeholder: string;
}

const PostForm: React.FC<PostFormProps> = ({ placeholder }) => {
  const {
    data: postResults,
    post: postPost,
    loading,
    error,
  } = usePost("/api/posts/create");
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const thisUserState = useSelector((state: RootState) => state.thisUser);

  const dispatch = useDispatch();

  const submit = useCallback(async () => {
    if (!content) {
      toast.error("Post empty!");
      return;
    }
    postPost({ content, image: postImage });
  }, [content, postImage]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to create post!");
    }
  }, [error]);

  useEffect(() => {
    if (postResults) {
      const newPost = postResults as Post;
      dispatch(addPost(newPost));
      console.log(postResults);
      setContent("");
      setPostImage("");
      toast.success("Post Created Successfully");
    }
  }, [postResults]);

  useEffect(() => {
    //alert(thisUserState?.data?.profileImage);
  }, [thisUserState.data]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      <div className="py-8">
        <h1 className="text-white text-2xl text-center font-bold mb-4 ">
          Welcome to Social Media App
        </h1>

        <div className="flex flex-row items-center justify-center gap-4"></div>

        {session?.user && (
          <div>
            <div className="flex flex-row gap-4">
              <div className="flex">
                <Avatar
                  userId={""}
                  user={thisUserState.data}
                  borderColor="border-sky-500"
                />
              </div>
              <div className="w-full">
                <textarea
                  disabled={loading}
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  className="
                opacity-80 
                peer 
                resize 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
                "
                  placeholder={placeholder}
                ></textarea>

                <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 trasition" />
              </div>
            </div>
            <ImageUpload value={postImage} label="Add Image here" onChange={setPostImage} />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={loading} onClick={submit} label="post" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostForm;
