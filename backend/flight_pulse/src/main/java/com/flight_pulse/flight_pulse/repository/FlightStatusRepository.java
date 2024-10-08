package com.flight_pulse.flight_pulse.repository;

import com.flight_pulse.flight_pulse.model.FlightStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightStatusRepository extends MongoRepository<FlightStatus, String> {

    Page<FlightStatus> findByStatus(String status, Pageable pageable);
}
