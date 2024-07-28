package com.flight_pulse.flight_pulse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FlightPulseApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlightPulseApplication.class, args);
	}

}
