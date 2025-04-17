package com.example.Sample.mapper;

import com.example.Sample.dto.LoginRequest;
import com.example.Sample.dto.LoginResponse;
import com.example.Sample.entity.User;

public class LoginMapper {

    public static User toUser(LoginRequest request) {
        return new User(request.getUsername(), request.getPassword());
    }

    public static LoginResponse toLoginResponse(String message, String token) {
        return new LoginResponse(message, token);
    }
}
