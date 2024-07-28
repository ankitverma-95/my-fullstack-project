package com.flight_pulse.flight_pulse.impl;

import com.flight_pulse.flight_pulse.service.FCMTokenService;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;

@Component
public class FCMTokenServiceImpl implements FCMTokenService {

    ConcurrentHashMap<String, String> userFcmTokens = new ConcurrentHashMap<>();


    @Override
    public void setFCMToken(String userId, String fcmToken) {
        userFcmTokens.put(userId, fcmToken);
    }

    @Override
    public String getFCMToken(String userId) {
        return userFcmTokens.get(userId);
    }
}
