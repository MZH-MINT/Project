package com.example.Sample.impl;

import com.example.Sample.dto.LoginRequest;
import com.example.Sample.dto.LoginResponse;
import com.example.Sample.mapper.LoginMapper;
import com.example.Sample.entity.User;
import com.example.Sample.service.LoginService;
import org.springframework.stereotype.Service;

@Service
public class Loginimpl implements LoginService {

    @Override
    public LoginResponse authenticate(LoginRequest request) {
        // Updated dummy authentication logic — check against "user" and "1234"
        if ("user".equals(request.getUsername()) && "1234".equals(request.getPassword())) {
            return LoginMapper.toLoginResponse("Login successful", "dummy-jwt-token");
        }
        return LoginMapper.toLoginResponse("Invalid credentials", null);
    }
}
