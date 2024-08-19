import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";

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
            label={"Logout"}
            icon={BiLogOut}
            onClick={() => {
              alert("logged out");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
