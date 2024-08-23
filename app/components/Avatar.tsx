"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { useCallback, useState } from "react";

interface AvatarProps {
  userId?: string;
  user?: User;
  isLarge?: boolean;
  hasBorder?: boolean;
  borderColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  userId,
  user,
  isLarge,
  hasBorder,
  borderColor,
}) => {
  const onClick = useCallback((event: any) => {}, []);
  return (
    <div
      className={`
        ${
          hasBorder
            ? "border-4 border-black"
            : borderColor
            ? "border-2 " + borderColor
            : ""
        }
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        relative
    `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={user?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
