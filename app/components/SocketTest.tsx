"use client";
import { Notification } from "@prisma/client";
// components/SocketTest.tsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { RootState } from "../store/store";

// Define the type for a Post
interface Post {
  id: number;
  content: string;
  image?: string; // Optional if image is not always present
}

const SocketTest = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const thisUserState = useSelector((state: RootState) => state.thisUser);
  let socket: Socket;

  useEffect(() => {
    // Initialize Socket.IO connection
    socket = io("http://localhost:8080", {
      transports: ["websocket"],
    });

    // Listen for new posts
    socket.on("notification", (post: Notification) => {
      //setPosts((prevPosts) => [post, ...prevPosts]);
      toast.success(post.message);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (thisUserState.data) {
      if (!socket) {
        socket = io("http://localhost:8080", {
          transports: ["websocket"],
        });
      }

      // Listen for new posts
      socket.on(
        "notification/" + thisUserState.data.id,
        (post: Notification) => {
          //setPosts((prevPosts) => [post, ...prevPosts]);
          toast.success("for me: " + post.message);
        }
      );

      // Cleanup on component unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [thisUserState.data]);

  return <></>;
};

export default SocketTest;
