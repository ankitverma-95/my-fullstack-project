package com.flight_pulse.flight_pulse.impl;

import com.flight_pulse.flight_pulse.FCMToken;
import com.flight_pulse.flight_pulse.service.FCMTokenService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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

    @Override
    public List<FCMToken> getAllFCMToken() {
        List<FCMToken> tokens = new ArrayList<>();

        for(Map.Entry<String, String> e: userFcmTokens.entrySet()) {
            FCMToken newToken = new FCMToken();
            newToken.setUserId(e.getKey());
            newToken.setToken(e.getValue());
            tokens.add(newToken);
        }
        return tokens;
    }
}
