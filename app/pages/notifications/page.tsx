import { useGet } from "@/app/hooks/fetcher";
import React from "react";

const NotificationsPage = () => {
  const { data: notificationsData, loading, error } = useGet("/notifications");
  return <div className="text-white">NotificationsPage</div>;
};

export default NotificationsPage;
