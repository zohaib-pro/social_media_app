"use client";

import React from "react";
import { useGet } from "@/app/hooks/fetcher";
import { Notification as NotificationType } from "@prisma/client";
import Notification from "./NotificationItem";

const NotificationList = () => {
  const {
    data: notificationsData,
    loading,
    error,
  } = useGet<NotificationType[]>("/api/notifications");

  return (
    <div className="flex flex-col p-2">
      {notificationsData?.map((item) => (
        <Notification key={item.id} notification={item} />
      ))}
    </div>
  );
};

export default NotificationList;
