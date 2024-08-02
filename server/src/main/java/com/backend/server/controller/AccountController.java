package com.backend.server.controller;

import com.backend.server.model.Account;
import com.backend.server.model.Response;
import com.backend.server.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/accounts")
public class AccountController {
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
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
}
