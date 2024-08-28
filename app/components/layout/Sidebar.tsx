"use client";
import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { BiLogOut, BiLogIn } from "react-icons/bi";

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
    href: "/pages/notifications",
    icon: BsBellFill,
    hasDot: true,
  },
  {
    label: "Profile",
    href: "/pages/users",
    icon: FaUser,
  },
];

function Sidebar() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="fixed">
        <div className="flex flex-col items-end">
          <div className="space-y-2 lg:w-[230px]">
            {items.map((item) => (
              <SidebarItem
                key={item.href}
                label={item.label}
                icon={item.icon}
                href={item.href}
                hasDot={item.hasDot}
              />
            ))}
            <SidebarItem
              label={session?.user ? "Logout" : "Login"}
              icon={session?.user ? BiLogOut : BiLogIn}
              onClick={() => {
                if (!session?.user) dispatch(onOpen());
                else signOut();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
