import Header from "@/app/components/Header";
import UserView from "@/app/components/users/UserView";
import React from "react";

const page = () => {
  return (
    <div>
      <Header label="User Profile" showBackArrow />
      <UserView />
    </div>
  );
};

export default page;
