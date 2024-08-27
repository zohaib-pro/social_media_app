"use client";
import React from "react";
import { IconType } from "react-icons";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  hasDot?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon: Icon,
  label,
  onClick,
  hasDot,
}) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) return onClick;

    if (href) {
      router.push(href);
    }
  }, [router, onClick, href]);
  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
      <div
        className="
        relative
        rounded-full
        h-14
        w-14
        flex
        items-center
        justify-center
        p-4
        hover:bg-slate-300
        hover:bg-opacity-10
        cursor-pointer
        lg:hidden
      "
      >
        {hasDot && (
          <div
            className="
            absolute
            top-0
            right-0
            h-3
            w-3
            bg-sky-500
            rounded-full
          "
          />
        )}
        <Icon size={28} color="white" />
      </div>
      <div
        className="
        relative
        hidden
        lg:flex
        items-center
        gap-4
        p-4
        rounded-full
        hover:bg-slate-300
        hover:bg-opacity-10
        cursor-pointer
      "
      >
        {hasDot && (
          <div
            className="
            absolute
            top-0
            left-10
            h-3
            w-3
            bg-sky-500
            rounded-full
          "
          />
        )}
        <Icon size={28} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
