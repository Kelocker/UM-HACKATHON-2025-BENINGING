import React, { useState } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";

const LocalNotificationButton = () => {
  const [permissionStatus, setPermissionStatus] = useState("prompt");

  const ensurePermission = async () => {
    const check = await LocalNotifications.checkPermissions();
    setPermissionStatus(check.display);

    if (check.display !== "granted") {
      const request = await LocalNotifications.requestPermissions();
      setPermissionStatus(request.display);
    }
  };

  const scheduleNotification = async () => {
    if (permissionStatus !== "granted") {
      console.log("Notification permission not granted.");
      return;
    }
    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: "Hey there!",
          body: "This is your local phone notification.",
          schedule: { at: new Date(Date.now() + 1000 * 5) }, // schedules for 5 seconds later
        },
      ],
    });
    console.log("Notification scheduled!");
  };

  const handleClick = async () => {
    await ensurePermission();
    await scheduleNotification();
  };

  return (
    <button
      className="bg-black text-white px-3 py-1 rounded text-sm"
      onClick={handleClick}
    >
      Notify
    </button>
  );
};

export default LocalNotificationButton;
