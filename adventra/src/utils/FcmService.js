// src/utils/FcmService.js
import { getToken } from "firebase/messaging";
import {messaging, vapiFireBase} from "./firebase"; // <-- use firebase.js

export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js" // this must match the SW file in public/
    );

    const token = await getToken(messaging, {
      vapidKey:
      vapiFireBase,
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
