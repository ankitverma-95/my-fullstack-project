package com.flight_pulse.flight_pulse.service;

import com.flight_pulse.flight_pulse.model.FlightStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FlightStatusService {

    List<FlightStatus> getAllFlights(int pageNo);
}
