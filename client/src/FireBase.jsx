if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }


import { initializeApp } from "firebase/app";
import {getMessaging} from "firebase/messaging";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBv0dWpqyNs9l5nXQRTXBooGEP7fYV7104",
    authDomain: "taskbasket-e0569.firebaseapp.com",
    projectId: "taskbasket-e0569",
    storageBucket: "taskbasket-e0569.appspot.com",
    messagingSenderId: "538220330628",
    appId: "1:538220330628:web:020365e14527c59442ccd1",
    measurementId: "G-QCX4M2SYX5"
  };


  export const app = initializeApp(firebaseConfig)
  export const messaging = getMessaging(app);
