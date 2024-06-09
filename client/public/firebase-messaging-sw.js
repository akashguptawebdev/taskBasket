importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyBv0dWpqyNs9l5nXQRTXBooGEP7fYV7104",
    authDomain: "taskbasket-e0569.firebaseapp.com",
    projectId: "taskbasket-e0569",
    storageBucket: "taskbasket-e0569.appspot.com",
    messagingSenderId: "538220330628",
    appId: "1:538220330628:web:020365e14527c59442ccd1",
    measurementId: "G-QCX4M2SYX5"
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});