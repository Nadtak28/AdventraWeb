// public/firebase-messaging-sw.js
import {firebaseConfig} from '../src/firebase.js'
// Import Firebase scripts via CDN (must use compat builds for service workers)
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

// Initialize Firebase app inside the service worker
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  navigator.serviceWorker.getRegistrations().then(async (regs) => {
    for (const reg of regs) {
      const success = await reg.unregister();
      console.log("Unregistered:", success, reg.scope);
    }
  });

  // Example: show a notification
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png",
  });
});
