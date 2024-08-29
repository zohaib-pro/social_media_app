"use client";

import React from "react";
import { useGet } from "@/app/hooks/fetcher";
import { Notification as NotificationType } from "@prisma/client";
import Notification from "./NotificationItem";
import { ClipLoader } from "react-spinners";

const NotificationList = () => {
  const {
    data: notificationsData,
    loading,
    error,
  } = useGet<NotificationType[]>("/api/notifications");

  console.log("notifications", notificationsData);
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  if (notificationsData && notificationsData.length == 0) {
    return <div className="text-white text-2xl">No Notifications!</div>;
  }

  return (
    <div className="flex flex-col p-2">
      {notificationsData?.map((item) => (
        <Notification key={item.id} notification={item} />
      ))}
    </div>
  );
};

export default NotificationList;
