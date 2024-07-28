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
        Pageable paging = (Pageable) PageRequest.of(pageNo, 10);
        return flightStatusRepository.findAll(paging).getContent();
    }
}
