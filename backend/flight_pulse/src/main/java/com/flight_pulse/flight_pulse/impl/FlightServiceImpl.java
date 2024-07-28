package com.flight_pulse.flight_pulse.impl;

import com.flight_pulse.flight_pulse.model.FlightStatus;
import com.flight_pulse.flight_pulse.repository.FlightStatusRepository;
import com.flight_pulse.flight_pulse.service.FlightStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FlightServiceImpl implements FlightStatusService {

    @Autowired
    FlightStatusRepository flightStatusRepository;

    @Override
    public List<FlightStatus> getAllFlights(int pageNo) {
        Pageable paging = (Pageable) PageRequest.of(pageNo, 60);
        return flightStatusRepository.findAll(paging).getContent();
    }

    @Override
    public List<FlightStatus> getDelayedFlights(int pageNo) {
        Pageable paging = (Pageable) PageRequest.of(pageNo, 60);
        return flightStatusRepository.findByStatus("Delayed", paging).getContent();
    }

    @Override
    public List<FlightStatus> getCancelledFlights(int pageNo) {
        Pageable paging = (Pageable) PageRequest.of(pageNo, 60);
        return flightStatusRepository.findByStatus("Cancelled", paging).getContent();
    }

    @Override
    public List<FlightStatus> getOnTimeFlights(int pageNo) {
        Pageable paging = (Pageable) PageRequest.of(pageNo, 60);
        return flightStatusRepository.findByStatus("On Time", paging).getContent();
    }
}
