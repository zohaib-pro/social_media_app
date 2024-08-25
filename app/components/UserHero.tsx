"use client";
import { User } from "@prisma/client";
import React, { useCallback } from "react";

import Button from "./Button";
import Avatar from "./Avatar";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { onOpen } from "@/app/store/slices/EditModalSlice";

interface UserHeroProps {
  user?: User;
}

const UserHero: React.FC<UserHeroProps> = ({ user }) => {
  const dispatch = useDispatch();
  const editModalState = useSelector((state: RootState) => state.editModal);
  const handleEdit = useCallback(() => {
    dispatch(onOpen());
  }, []);

  return (
    <div className={""/*"sticky top-0 bg-black rounded-md" */}>
      <div className="bg-neutral-700 h-44 relative">
        <Image
          src={user?.coverImage || "/images/cover_placeholder.png"}
          alt="cover image"
          fill
          style={{ objectFit: "cover" }}
        />

        <div className="absolute -bottom-16 left-4">
          <Avatar user={user} userId={user?.id + ""} isLarge hasBorder />
        </div>
      </div>

      {/* <h1 className="text-white">ttskfsklfj</h1> */}
      <div className="flex flex-row justify-end bottom mt-2 me-1">
        <Button label="edit" onClick={handleEdit} />
      </div>
    </div>
  );
};

export default UserHero;
