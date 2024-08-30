package com.vh.hms.controllers;

import com.vh.hms.services.AuthService;
import com.vh.hms.services.TokenService;
import com.vh.hms.domain.patient.PatientRequestDTO;
import com.vh.hms.domain.user.AuthDTO;
import com.vh.hms.domain.user.LoginResponseDTO;
import com.vh.hms.domain.user.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AuthService authService;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());
        var role = String.valueOf(((User) auth.getPrincipal()).getRole());
        return ResponseEntity.ok(new LoginResponseDTO(token, role));
    }
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid PatientRequestDTO data) {
        if (authService.loadUserByUsername(data.email()) != null) return ResponseEntity.badRequest().build();
        authService.patientSignUp(data);
        return ResponseEntity.ok().build();
    }
}
