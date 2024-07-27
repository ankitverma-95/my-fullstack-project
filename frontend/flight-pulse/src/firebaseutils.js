// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { deleteToken, getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDZKPNQrq504C23IiFJmEil__Q-m4OjY7U",
  authDomain: "cloud-messaging-5c20a.firebaseapp.com",
  projectId: "cloud-messaging-5c20a",
  storageBucket: "cloud-messaging-5c20a.appspot.com",
  messagingSenderId: "490626908557",
  appId: "1:490626908557:web:2753b4b17c06bb2eabfdc4",
  measurementId: "G-TB1GNGBJZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);


export async function requestFCMToken() {
    console.log('Requesting permission...');
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            const currentToken = await getToken(messaging, { vapidKey: 'BOoZmMlK7W28bAVCs-AJ5hVDxoiVWFy7G3VW1I_aPJKfFs1nH_uElRRwZHhFRpOAZyFg608R_1k4czi4BfMiXiA' });
            console.log(currentToken);
            if (currentToken) {
                return currentToken;
            } else {
                console.log('No registration token available. Request permission to generate one.');
                return null;
            }
        } else {
            console.log('Notification permission has not been granted.');
            throw new Error("Notification not granted");
        }
    } catch (e) {
        console.error('An error occurred while requesting the FCM token:', e);
        throw e;
    }
}

export async function unsubscribeFromFCM() {
    console.log('Unsubscribing from FCM...');
    try {
        const currentToken = await getToken(messaging);
        if (currentToken) {
            await deleteToken(messaging, currentToken);
            console.log('Token unsubscribed successfully');
        } else {
            console.log('No token found');
        }
    } catch (e) {
        console.error('An error occurred while unsubscribing from FCM:', e);
        if (e.code === 'messaging/token-unsubscribe-failed') {
            console.error('Failed to unsubscribe token:', e.message);
        }
    }
}