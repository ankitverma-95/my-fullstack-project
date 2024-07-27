import { useEffect, useState } from 'react';
import './App.css';
import { requestFCMToken, unsubscribeFromFCM } from './firebaseutils';

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

    const refreshFCMToken = async () => {
      try {
        await unsubscribeFromFCM();
        setFcmToken(null); // Reset the token state after unsubscribing
      } catch (err) {
        console.log('Error unsubscribing from FCM:', err);
      }
    };

    if (fcmToken) {
      // Optionally perform actions if there is already an FCM token
      console.log('FCM Token already exists:', fcmToken);
      refreshFCMToken();
    } 

    // Cleanup function to unsubscribe from FCM when the component unmounts
    return () => {
      fetchFCMToken();
      // refreshFCMToken();
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
