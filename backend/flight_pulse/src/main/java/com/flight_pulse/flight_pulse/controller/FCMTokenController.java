package com.flight_pulse.flight_pulse.controller;

import com.flight_pulse.flight_pulse.FCMToken;
import com.flight_pulse.flight_pulse.service.FCMTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/token/fcm")
public class FCMTokenController {

    @Autowired
    FCMTokenService fcmTokenService;

    @PostMapping("/register")
    public String registerFCMToken(@RequestBody FCMToken fcmToken) {
        fcmTokenService.setFCMToken(fcmToken.getUserId(), fcmToken.getToken());
        return "Token successfully registered";
    }
}
