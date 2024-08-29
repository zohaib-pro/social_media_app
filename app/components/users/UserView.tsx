"use client";

import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import UserHero from "./UserHero";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
const UserView = () => {
  //const router = useRouter();
  const thisUserState = useSelector((state: RootState) => state.thisUser);

  return !thisUserState.data ? (
    <div className="flex justify-center items-center h-full ">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ) : (
    <UserHero user={thisUserState.data} />
  );
};

export default UserView;
