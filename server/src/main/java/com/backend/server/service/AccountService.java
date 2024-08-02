package com.backend.server.service;

import com.backend.server.model.Account;
import com.backend.server.model.Response;
import com.backend.server.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account getAccountByUsername(String username) {
        Account accountDB = accountRepository.findByUsername(username);
        if (accountDB == null) {
            throw new RuntimeException("Account not found with username: " + username);
        }
        return accountDB;
    }

    private Account findAccountById(String id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found with ID: " + id));
    }
}
