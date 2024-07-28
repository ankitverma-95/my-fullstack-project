package com.flight_pulse.flight_pulse.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Document(collection = "flightStatus")
public class FlightStatus {

    @Id
    private String id;

    private String flightNumber;

    private String departure;

    private String arrival;

    private String origin;

    private String destination;

    private Double currentlongitude;

    private Double currentlatitude;
    private String status;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getArrival() {
        return arrival;
    }

    public void setArrival(String arrival) {
        this.arrival = arrival;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Double getCurrentlongitude() {
        return currentlongitude;
    }

    public void setCurrentlongitude(Double currentlongitude) {
        this.currentlongitude = currentlongitude;
    }

    public Double getCurrentlatitude() {
        return currentlatitude;
    }

    public void setCurrentlatitude(Double currentlatitude) {
        this.currentlatitude = currentlatitude;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
