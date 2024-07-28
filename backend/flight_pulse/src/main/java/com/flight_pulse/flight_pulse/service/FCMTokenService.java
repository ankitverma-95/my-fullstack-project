package com.flight_pulse.flight_pulse.service;

import com.flight_pulse.flight_pulse.FCMToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FCMTokenService {

    void setFCMToken(String userId, String fcmToken);

    String getFCMToken(String userId);

    List<FCMToken> getAllFCMToken();
}
