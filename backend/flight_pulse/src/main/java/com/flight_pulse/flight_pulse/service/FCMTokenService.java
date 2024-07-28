package com.flight_pulse.flight_pulse.service;

import org.springframework.stereotype.Service;

@Service
public interface FCMTokenService {

    void setFCMToken(String userId, String fcmToken);

    String getFCMToken(String userId);
}
