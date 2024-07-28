package com.flight_pulse.flight_pulse.controller;

import com.flight_pulse.flight_pulse.FCMToken;
import com.flight_pulse.flight_pulse.NotificationMessage;
import com.flight_pulse.flight_pulse.model.FlightStatus;
import com.flight_pulse.flight_pulse.service.FCMTokenService;
import com.flight_pulse.flight_pulse.service.FirebaseMessagingService;
import com.flight_pulse.flight_pulse.service.FlightStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/flights")
public class FlightStatusController {

    @Autowired
    FlightStatusService flightStatusService;
    @Autowired
    FCMTokenService fcmTokenService;

    @Autowired
    FirebaseMessagingService messagingService;

    private int i = 0;

    private List<FlightStatus> currentFlightStatus = new ArrayList<>();

    @GetMapping
    public List<FlightStatus> getAllFlightStatus(@RequestParam(defaultValue = "0") int page) {
        this.currentFlightStatus = flightStatusService.getAllFlights(page);
        return currentFlightStatus;
    }
    @GetMapping("/delayed")
    public List<FlightStatus> getDelayedFlightStatus(@RequestParam(defaultValue = "0") int page) {
        List<FlightStatus> delayedFlights = flightStatusService.getDelayedFlights(page);
        return delayedFlights;
    }

    @GetMapping("/cancelled")
    public List<FlightStatus> getCancelledFlightStatus(@RequestParam(defaultValue = "0") int page) {
        return flightStatusService.getCancelledFlights(page);
    }

    @GetMapping("/onTime")
    public List<FlightStatus> getOnTimeFlightStatus(@RequestParam(defaultValue = "0") int page) {
        return flightStatusService.getOnTimeFlights(page);
    }

    @Scheduled(fixedDelay = 5000)
    private void sendNotificationToUsers() throws InterruptedException {
        List<FCMToken> allFCMToken = fcmTokenService.getAllFCMToken();
        if (currentFlightStatus != null &&!currentFlightStatus.isEmpty()) {
            List<FlightStatus> list = currentFlightStatus.stream().filter(flightStatus -> !flightStatus.getStatus().equals("On Time")).toList();
            if (list != null && !list.isEmpty() && !allFCMToken.isEmpty()) {
                    NotificationMessage notificationMessage = getNotificationMessage(list, this.i, allFCMToken);
                    messagingService.sendNotificationByToken(notificationMessage);
                    i++;
            }
        }
        System.out.println("Scheduling at fixedDelay : " + LocalTime.now());
    }

    private static NotificationMessage getNotificationMessage(List<FlightStatus> list, int i, List<FCMToken> allFCMToken) {
        FlightStatus flightStatus = list.get(i);

        NotificationMessage notificationMessage = new NotificationMessage();
        notificationMessage.setTitle(flightStatus.getStatus());
        notificationMessage.setBody(flightStatus.getFlightNumber());
        HashMap<String, String> body = new HashMap<>();
        body.put("Departure", flightStatus.getDeparture());
        body.put("Arrival", flightStatus.getArrival());
        body.put("origin", flightStatus.getOrigin());
        body.put("destination", flightStatus.getDestination());
        notificationMessage.setData(body);
        notificationMessage.setRecipientToken(allFCMToken.get(0).getToken());
        return notificationMessage;
    }

}
