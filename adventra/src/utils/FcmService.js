// src/utils/FcmService.js
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase"; // <-- use firebase.js

export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js" // this must match the SW file in public/
    );

    const token = await getToken(messaging, {
      vapidKey:
        "BB01AJyEv184wwGyYQREYJDzhYPwQRTmSBW7FD64_SeYKtDUKyOGpLsgsQan4eVw7mA8Opxox8jcok7iZdugnT0",
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.warn("No FCM token retrieved");
      return null;
    }
  } catch (err) {
    console.error("Error getting FCM token", err);
    return null;
  }
};
