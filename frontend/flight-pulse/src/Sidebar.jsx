import React from 'react'
import "./Sidebar.css"

function Sidebar(props) {


    const getAllFlight = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
        const flights = await response.json();
        props.onFlightStatus({name: 'All Flight', flights});
    }

    const getDelayedFlight = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
        const flights = await response.json();
        props.onFlightStatus({name: 'Delayed Flight', flights});
    }

    const getCancelledFlight = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
        const flights = await response.json();
        props.onFlightStatus({name: 'Cancelled Flight', flights});
    }

    const getOnTimeFlight = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
        const flights = await response.json();
        props.onFlightStatus({name: 'On Time Flight', flights});
    }

  return (
    <div className="sidebar-section">
        <div className="list-item" onClick={this.getAllFlight}>
            <a href="#">All Flight</a>
        </div>
        <div className="list-item" onClick={this.getDelayedFlight}>
            <a href="#">Delayed Flight</a>
        </div>
        <div className="list-item" onClick={this.getCancelledFlight}>
            <a href="#">Cancelled Flight</a>
        </div>
        <div className="list-item" onClick={this.getOnTimeFlight}>
            <a href="#">On Time Flight</a>
        </div>
    </div>
  )
}

export default Sidebar