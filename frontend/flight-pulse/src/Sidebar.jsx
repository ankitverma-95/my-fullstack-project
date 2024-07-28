import React from 'react'
import "./Sidebar.css"

function Sidebar(props) {


    const getAllFlight = async () => {
        try {
            const response = await fetch(`http://localhost:8080/flights?page=0`);
            const flights = await response.json();
            props.onFlightStatus({name: 'All Flight', flights});
        } catch(err) {
            console.log(err);
        }
    }

    const getDelayedFlight = async () => {
        try {
            const response = await fetch(`http://localhost:8080/flights/delayed?page=0`);
            const flights = await response.json();
            props.onFlightStatus({name: 'Delayed Flight', flights});
        } catch(err) {
            console.log(err);
        }
    }

    const getCancelledFlight = async () => {
        try {
            const response = await fetch(`http://localhost:8080/flights/cancelled?page=0`);
            const flights = await response.json();
            props.onFlightStatus({name: 'Cancelled Flight', flights});
        } catch(err) {
            console.log(err)
        }
    }

    const getOnTimeFlight = async () => {
        try {
            const response = await fetch(`http://localhost:8080/flights/onTime?page=0`);
            const flights = await response.json();
            props.onFlightStatus({name: 'On Time Flight', flights});
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <div className="sidebar-section">
        <div className="list-item" onClick={getAllFlight}>
            <a href="#">All Flight</a>
        </div>
        <div className="list-item" onClick={getDelayedFlight}>
            <a href="#">Delayed Flight</a>
        </div>
        <div className="list-item" onClick={getCancelledFlight}>
            <a href="#">Cancelled Flight</a>
        </div>
        <div className="list-item" onClick={getOnTimeFlight}>
            <a href="#">On Time Flight</a>
        </div>
    </div>
  )
}

export default Sidebar