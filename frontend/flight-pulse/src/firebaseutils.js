// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { deleteToken, getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);


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