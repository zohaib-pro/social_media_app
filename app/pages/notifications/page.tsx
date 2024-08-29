import NotificationList from "@/app/components/layout/notifications/NotificationList";
import React from "react";

const NotificationsPage = () => {
  return (
    <div className="text-white">
      <h1 className="text-sky-400 font-bold text-3xl">Notifications</h1>
      <NotificationList />
    </div>
  );
};

export default NotificationsPage;
