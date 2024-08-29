// src/components/Notification.tsx

import React from "react";
import { Notification as NotificationType } from "@prisma/client";
interface NotificationProps {
  notification: NotificationType;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  console.log("notification", notification);
  return (
    <div
      className={`p-4 rounded-lg mt-2 text-red-700 ${
        notification.read ? "bg-neutral-800 " : "bg-neutral-700"
      }`}
    >
      <div className="text-sm text-blue-600 font-medium">
        {notification.type}
      </div>
      <div className="text-white">{notification.message}</div>
      <div className="text-xs text-neutral-400 mt-2">
        {new Date(notification.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default Notification;
