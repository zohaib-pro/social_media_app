"use client";
import { User } from "@prisma/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useGet } from "../hooks/fetcher";
import { ClipLoader } from "react-spinners";
import UserHero from "./UserHero";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
const UserView = () => {
  //const router = useRouter();
  const thisUserState = useSelector((state: RootState) => state.thisUser);
  const {
    data: notificationsData,
    loading,
    error,
  } = useGet<Notification[]>("/api/notifications");
  console.log(notificationsData);

  return !thisUserState.data ? (
    <div className="flex justify-center items-center h-full ">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ) : (
    <>
      <div className="text-white text-lg">User Profile</div>
      <UserHero user={thisUserState.data} />
    </>
  );
};

export default UserView;
