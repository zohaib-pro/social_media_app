import React from "react";

import { useGet } from "../hooks/fetcher";
import { User } from "@prisma/client";
import UserHero from "./UserHero";
import { useSelector } from "react-redux";

interface UserComponentProps {
  uid: string;
}

const UserComponent: React.FC<UserComponentProps> = ({ uid }) => {
  return <div></div>;
};

export default UserComponent;
