import React from "react";
import Avatar from "../Avatar";
import { User } from "@prisma/client";
import { FaPlusCircle, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

interface FriendItemProps {
  user: User;
}

const FriendItem: React.FC<FriendItemProps> = ({ user }) => {
  const [isFriend, setIsFriend] = useState(false);
  const handleFriendShip = () => {
    setIsFriend(!isFriend);
  };
  return (
    <div key={user.id} className="flex flex-row gap-4">
      <Avatar userId={user.id + ""} user={user} />
      <div className="flex flex-col">
        <p className="text-white font-semibold text-sm">{user.name}</p>
        <p className="text-neutral-400 text-sm">{user.email}</p>
      </div>
      <div className="flex  flex-1 justify-end items-center cursor-pointer">
        {!isFriend ? (
          <FaPlusCircle size={28} color="#0ea5e9" onClick={handleFriendShip} />
        ) : (
          <FaCheckCircle size={28} color="#0ea5e9" onClick={handleFriendShip} />
        )}
      </div>
    </div>
  );
};

export default FriendItem;
