package com.backend.server.service;

import com.backend.server.DTO.RegistryDTO;
import com.backend.server.model.Account;
import com.backend.server.model.Authority;
import com.backend.server.model.Response;
import com.backend.server.model.Student;
import com.backend.server.repository.AccountRepository;
import com.backend.server.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityRepository authorityRepository;


    @Autowired
    public AccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder, AuthorityRepository authorityRepository) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
    }

    public Account getAccountByUsername(String username) {
        Account accountDB = accountRepository.findByUsername(username);
        if (accountDB == null) {
            throw new RuntimeException("Account not found with username: " + username);
        }
        return accountDB;
    }

    public Account findAccountById(String id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found with ID: " + id));
    }

    @Transactional
    public Account createUser(RegistryDTO registryDTO) {
        String hashedPassword = passwordEncoder.encode(registryDTO.getPassword());
        registryDTO.setPassword(hashedPassword);

        Student student = new Student(registryDTO.getPhone(), registryDTO.getName(), registryDTO.getGender());
        Account account = new Account(registryDTO.getUsername(), registryDTO.getPassword());
        account.setStudent(student);
        student.setAccount(account);

        Authority userAuthority = authorityRepository.findById("1")
                .orElseThrow(() -> new RuntimeException(Response.notFound("Authority", "1")));
        account.setAuthorities(Collections.singletonList(userAuthority));
        userAuthority.getUsers().add(account);

        return accountRepository.save(account);
    }
}
