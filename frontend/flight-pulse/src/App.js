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
import NotificationsIcon from "@mui/icons-material/Notifications";
import indigo from "./indigo.png";
import { onMessage } from "firebase/messaging";

function App() {
  const [status, setStatus] = useState("All Flight");
  const [markers, setMarkers] = useState([
    {
      geocode: [48.86, 2.3522],
      popUp: "Hello, I am pop up 1",
    },
    {
      geocode: [48.85, 2.3522],
      popUp: "Hello, I am pop up 2",
    },
    {
      geocode: [48.855, 2.34],
      popUp: "Hello, I am pop up 3",
    },
  ]);
  const [showNotification, setNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        const token = await requestFCMToken();
        // setFcmToken(token);
        fcmTokenRegister(token);
      } catch (err) {
        console.log("Error getting FCM token", err);
      }
    };

    const fetchAllFlight = async () => {
      try {
        const response = await fetch(`http://localhost:8080/flights?page=0`);
        const flights = await response.json();
        traveseList(flights);
      } catch (err) {
        console.log(err);
      }
    };

    const fcmTokenRegister = async (fcmToken) => {
      try {
          await fetch("http://localhost:8080/token/fcm/register", {
            method: 'post',
            headers: { "Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify({
              userId: (Math.random() + 1).toString(36).substring(7),
              token: fcmToken,
            })
           })
      } catch(err) {
        console.log(err)
      }
    }

    return () => {
      fetchFCMToken();
      fetchAllFlight();
      onMessage(messaging, (payload) => {
        setNotification(true);
        setNotifications([...notifications, {
          flightNumber: payload.notification.body,
          flightStatus: payload.notification.title,
          route: payload.data.origin+" "+payload.data.destination,
          departureDate: payload.data.Departure
        }]);
      })
    };
  }, []); // Dependency array includes fcmToken

  console.log(notifications);
  const traveseList = (flights) => {
    let list = [];
    flights.forEach((flight) => {
      list.push({
        geocode: [flight.currentlatitude, flight.currentlongitude],
        flightNumber: flight.flightNumber,
        destination: flight.destination,
        arrival: flight.arrival,
        status: flight.status
      });
    });
    setMarkers(list);
  }

  const customIcon = new Icon({
    iconUrl: require("./plane-icon.png"),
    iconSize: [16, 16], // size of the icon
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
    traveseList(flightStatus.flights);
    setStatus(flightStatus.name);
  };

  const onNotificationChange = () => {
    setNotification(!showNotification);
  };

  return (
    <>
      <Header />
      <div id="section-container">
        <Sidebar onFlightStatus={handleFlightStatusList} />
        <div className="map-section">
          <div className="map-container">
            <span id="flight-status-heading">{status} Status</span>
            <MapContainer center={[20.5937, 78.9629]} zoom={4}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createClusterCustomIcon}
              > */}
              {markers.map((marker) => (
                <Marker position={marker.geocode} icon={customIcon}>
                  <Popup>
                    <div id="popup">
                       <div id="pop-img-cntr">
                          <img src={indigo} />
                       </div>
                       <div>
                          <span id="pop-desc">
                            <strong>Flight No.</strong>
                          {marker.flightNumber}
                          </span>
                          <span> <strong>Destination:</strong>
                            {marker.destination}
                          </span>
                          <span> <strong>Arrival:</strong>
                            {marker.arrival}
                          </span>
                          <span> <strong>Status:</strong>
                            {marker.status}
                          </span>
                       </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {/* </MarkerClusterGroup> */}
            </MapContainer>
          </div>
          <div id="notification-section">
            <div
              id="notification-icon-container"
              onClick={onNotificationChange}
            >
              <NotificationsIcon id="notification-icon" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: showNotification ? "block" : "none" }}>
        <div id="notification-list">
          {notifications.map((notification)=> (
            <div class="notification-list-item">
              <div>
                <img src={indigo}/>
              </div>
              <div id="desc-container">
                <div class="row">
                  <span id="flight-number">{notification.flightNumber}</span>
                  <span id="flight-status">{notification.flightStatus}</span>
                </div>
                <div class="row">
                  <span id="route">{notification.route}</span>
                </div>
                <div class="row">
                  <span id="date">
                    <span id="depart-date">Departure Date:</span>{notification.departureDate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
