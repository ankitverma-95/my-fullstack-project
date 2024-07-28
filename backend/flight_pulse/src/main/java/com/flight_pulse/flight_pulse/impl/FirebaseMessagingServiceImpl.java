package com.flight_pulse.flight_pulse.impl;

import com.flight_pulse.flight_pulse.NotificationMessage;
import com.flight_pulse.flight_pulse.service.FirebaseMessagingService;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FirebaseMessagingServiceImpl implements FirebaseMessagingService {

    @Autowired
    FirebaseMessaging firebaseMessaging;

    @Override
    public String sendNotificationByToken(NotificationMessage notificationMessage) {
        Message message = Message.builder()
                .setNotification(Notification.builder()
                        .setTitle(notificationMessage.getTitle())
                        .setBody(notificationMessage.getBody())
                        .setImage("https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_square/6E")
                        .build())
                .setToken(notificationMessage.getRecipientToken())
                .putAllData(notificationMessage.getData())
                .build();

        try {
            String response = firebaseMessaging.send(message);
            System.out.println("Successfully sent message: " + response);
            return response;
        }catch (FirebaseMessagingException e) {
            System.out.println(e.getMessagingErrorCode());
            System.out.println(e.getMessage());
            return "Error sending notification";
        }
    }
}
