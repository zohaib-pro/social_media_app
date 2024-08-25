"use client";
import { User } from "@prisma/client";
import React from "react";
import Avatar from "../Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

import { RootState } from "@/app/store/store";
import { useGet } from "@/app/hooks/fetcher";
import { setUsers } from "@/app/store/slices/UsersSlice";
import { setThisUser } from "@/app/store/slices/ThisUserSlice";
import { useSession } from "next-auth/react";

function FriendsBar() {
  const thisUserState = useSelector((state: RootState) => state.thisUser);
  const session = useSession();
  const { data: users, loading, error } = useGet<User[]>("/api/users");
  const dispatch = useDispatch();
  console.log("refreshed");
  const initialLoad = useRef(true);

  const usersState = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (users && initialLoad.current) {
      dispatch(setUsers(users));
      initialLoad.current = false;
    }

    if (session?.data?.user && users) {
      const thisUser = users.find((user) => session?.data?.user?.id == user.id);
      if (thisUser) dispatch(setThisUser(thisUser));
      console.log("setting this user: ", thisUser);
    } else {
      console.log("not setting this user", null);
    }
  }, [users, session?.data?.user]);
  return (
    <div className="px-6 py-4 lg-block">
    
    <div className="fixed">
    <div className="bg-neutral-800 rounded-xl p-4">
        <div className="text-white text-xl font-semibold">Friends</div>
        <div className="flex flex-col gap-6 mt-4">
          {usersState.data.map((user) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id + ""} user={user} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default FriendsBar;
