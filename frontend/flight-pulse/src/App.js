import { useEffect, useState } from 'react';
import './App.css';
import { messaging, requestFCMToken, unsubscribeFromFCM } from './firebaseutils';
import { onMessage } from 'firebase/messaging';

function App() {

  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        const token = await requestFCMToken();
        setFcmToken(token);
        console.log('FCM Token:', token);
      } catch (err) {
        console.log('Error getting FCM token', err);
      }
    };

    return () => {
      fetchFCMToken();
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
      })
    };
  }, []); // Dependency array includes fcmToken

  return (
    <div>
      <h1>FCM Token Management</h1>
      {fcmToken ? (
        <p>FCM Token: {fcmToken}</p>
      ) : (
        <p>Fetching FCM Token...</p>
      )}
    </div>
  );
}

export default App;
