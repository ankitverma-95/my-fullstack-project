package com.flight_pulse.flight_pulse.controller;

import com.flight_pulse.flight_pulse.model.FlightStatus;
import com.flight_pulse.flight_pulse.service.FlightStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/flights")
public class FlightStatusController {

    @Autowired
    FlightStatusService flightStatusService;

    @GetMapping
    public List<FlightStatus> getAllFlightStatus(@RequestParam(defaultValue = "0") int page) {
     return flightStatusService.getAllFlights(page);
    }
}
