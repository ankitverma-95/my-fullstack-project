package com.flight_pulse.flight_pulse.service;

import com.flight_pulse.flight_pulse.NotificationMessage;
import org.springframework.stereotype.Service;

@Service
public interface FirebaseMessagingService {

    String sendNotificationByToken(NotificationMessage notificationMessage);
}
