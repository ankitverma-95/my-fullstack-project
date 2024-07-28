import "./App.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  messaging,
  requestFCMToken,
  unsubscribeFromFCM,
} from "./firebaseutils";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import Header from "./Header";
import Sidebar from "./Sidebar";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

function App() {
  const [fcmToken, setFcmToken] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        const token = await requestFCMToken();
        setFcmToken(token);
        console.log("FCM Token:", token);
      } catch (err) {
        console.log("Error getting FCM token", err);
      }
    };

    return () => {
      // fetchFCMToken();
      // onMessage(messaging, (payload) => {
      // console.log('Message received. ', payload);
      // })
    };
  }, []); // Dependency array includes fcmToken

  const customIcon = new Icon({
    iconUrl: require("./plane-icon.png"),
    iconSize: [16, 16] // size of the icon
  });

  const createClusterCustomIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  
  const handleFlightStatusList = (flightStatus) => {
    console.log(flightStatus);
  }

  const showNotification = () => {
    
  }

  return (
    // <div>
    //   <h1>FCM Token Management</h1>
    //   {fcmToken ? (
    //     <p>FCM Token: {fcmToken}</p>
    //   ) : (
    //     <p>Fetching FCM Token...</p>
    //   )}
    // </div>
    <>
      <Header/>
      <div id="section-container">
        <Sidebar onFlightStatus={this.handleFlightStatusList}/>
        <div className="map-section">
          <div className="map-container">
            <span id="flight-status-heading">Flight Status</span>
            <MapContainer center={[48.8566, 2.3522]} zoom={13}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createClusterCustomIcon}
              >
                 {markers.map((marker) => (
                    <Marker position={marker.geocode} icon={customIcon}>
                      <Popup>{marker.popUp}</Popup>
                    </Marker>
                  ))}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
          <div id="notification-section">
            <div id="notification-icon-container" onClick={this.showNotification}>
              <NotificationsIcon id="notification-icon"/>
            </div>
          </div>
        </div>
      </div>

      <div id='hide'>
        <div id="notification-list">
          <div class="notification-list-item">
            <div class="row">
              <span id="flight-number">3234233</span>
              <span id="flight-status">Delayed</span>
            </div>
            <div class="row">
              <span id="route">3234233</span>
            </div>
            <div class="row">
              <span id="date"><span id="depart-date">Departure Date:</span>30-2-2024</span>
            </div>
          </div>
          <div class="notification-list-item">
            <div class="row">
              <span id="flight-number">3234233</span>
              <span id="flight-status">Delayed</span>
            </div>
            <div class="row">
              <span id="route">3234233</span>
            </div>
            <div class="row">
              <span id="date"><span id="depart-date">Departure Date:</span>30-2-2024</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
