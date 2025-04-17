package com.example.Sample.service;

import com.example.Sample.dto.LoginRequest;
import com.example.Sample.dto.LoginResponse;

public interface LoginService {
    LoginResponse authenticate(LoginRequest request);
}
