"use client";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "../Avatar";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { addPost } from "../../store/slices/PostsSlice";

interface PostFormProps {
  placeholder: string;
}

const PostForm: React.FC<PostFormProps> = ({ placeholder }) => {
  const { data: session } = useSession();
  const [isLoading, setLoading] = useState<boolean>();
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const submit = useCallback(async () => {
    if (!content) {
      toast.error("Post empty!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/posts/create", {
        content,
      });

      if (response.status == 201) {
        dispatch(addPost(response.data));
        toast.success("Post Created");
        setContent("");
        setLoading(false);
        //setResults(JSON.stringify(response.data));
      } else {
        toast.error("Registration failed with error code: " + response.status);
      }
    } catch (e: any) {
      console.log(e);
      toast.error("error at posting");
    }
  }, [content]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      <div className="py-8">
        <h1 className="text-white text-2xl text-center font-bold mb-4">
          Welcome to Social Media App
        </h1>

        <div className="flex flex-row items-center justify-center gap-4"></div>

        {session?.user && (
          <div className="flex flex-row gap-4">
            <div>
              <Avatar userId={session.user.email || ""} />
            </div>
            <div className="w-full">
              <textarea
                disabled={isLoading}
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
              <div className="mt-4 flex flex-row justify-end">
                <Button disabled={isLoading} onClick={submit} label="post" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostForm;
