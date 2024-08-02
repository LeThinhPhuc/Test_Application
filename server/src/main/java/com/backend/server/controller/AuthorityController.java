package com.backend.server.controller;

import com.backend.server.model.Authority;
import com.backend.server.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/authorities")
public class AuthorityController {
    private final AuthorityService authorityService;

    @Autowired
    public AuthorityController(AuthorityService authorityService) {
        this.authorityService = authorityService;
    }

    // Get all authorities by username
    @GetMapping("/username/{username}")
    public ResponseEntity<?> getAllAuthoritiesByUsername(@PathVariable String username) {
        try {
            List<Authority> authorities = authorityService.getAllAuthoritiesByUsername(username);
            return ResponseEntity.ok(authorities);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Authorities not found with username: " + username);
        }
    }
}
