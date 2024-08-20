"use client";
import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";

import { signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { onOpen } from "@/app/store/slices/LoginModalSlice";
import toast from "react-hot-toast";

const items = [
  {
    label: "Home",
    href: "/home",
    icon: BsHouseFill,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: BsBellFill,
  },
  {
    label: "Profile",
    href: "/users/123",
    icon: FaUser,
  },
];

function Sidebar() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              label={item.label}
              icon={item.icon}
              href={item.href}
            />
          ))}
          <SidebarItem
            label={session?.user ? "Logout" : "Login"}
            icon={BiLogOut}
            onClick={() => {
              if (!session?.user) dispatch(onOpen());
              else signOut();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
