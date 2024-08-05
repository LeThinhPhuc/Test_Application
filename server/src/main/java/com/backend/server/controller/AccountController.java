package com.backend.server.controller;

import com.backend.server.DTO.RegistryDTO;
import com.backend.server.model.Account;
import com.backend.server.model.JwtAuthResponse;
import com.backend.server.model.Response;
import com.backend.server.security.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.backend.server.service.AccountService;

@Controller
@RequestMapping("/accounts")
public class AccountController {
    private final AccountService accountService;
    private final AuthenticationManager authenticationManager;
    private final JWTGenerator jwtGenerator;

    @Autowired
    public AccountController(AccountService accountService, AuthenticationManager authenticationManager, JWTGenerator jwtGenerator) {
        this.accountService = accountService;
        this.authenticationManager = authenticationManager;
        this.jwtGenerator = jwtGenerator;
    }

    // Get an account by username
    @GetMapping("/username/{username}")
    public ResponseEntity<?> getAccountByUsername(@PathVariable String username) {
        try {
            Account account = accountService.getAccountByUsername(username);
            return ResponseEntity.ok(account);
        } catch (RuntimeException ex) {
            Response response = Response.of(HttpStatus.NOT_FOUND, ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // Get an account by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getAccountById(@PathVariable String id) {
        try {
            Account account = accountService.findAccountById(id);
            return ResponseEntity.ok(account);
        } catch (RuntimeException ex) {
            Response response = Response.of(HttpStatus.NOT_FOUND, ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> registerAccount(@RequestBody RegistryDTO registryDTO) {
        try {
            Account savedAccount = accountService.createUser(registryDTO);
            return ResponseEntity.ok(savedAccount);
        } catch (Exception ex) {
            Response response = Response.of(HttpStatus.BAD_REQUEST, ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody RegistryDTO registryDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(registryDTO.getUsername(), registryDTO.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtGenerator.generateToken(authentication);
            String refreshToken = jwtGenerator.generateRefreshToken(authentication);
            return ResponseEntity.ok(new JwtAuthResponse(token, refreshToken));
        } catch (Exception ex) {
            Response response = Response.of(HttpStatus.BAD_REQUEST, ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
