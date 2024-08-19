"use client";
import { useSession } from "next-auth/react";

const MyComponent = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // Loading state (e.g., show a spinner)
    return <div className="text-white">Loading...</div>;
  }

  if (status === "authenticated") {
    // User is logged in
    return <div className="text-white">Welcome, {session.user.name}!</div>;
  }

  // User is not logged in
  return <div className="text-white">You are not logged in.</div>;
};

export default MyComponent;
