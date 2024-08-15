package com.backend.server.service;

import com.backend.server.DTO.RegistryDTO;
import com.backend.server.model.*;
import com.backend.server.repository.AccountRepository;
import com.backend.server.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

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

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
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
    public Account createUser(RegistryDTO registryDTO, String type) {
        String hashedPassword = passwordEncoder.encode(registryDTO.getPassword());
        registryDTO.setPassword(hashedPassword);

        Account account = new Account(registryDTO.getUsername(), registryDTO.getPassword());
        if (Objects.equals(type, "student")) {
            Student student = new Student(registryDTO.getId(), registryDTO.getPhone(), registryDTO.getName(), registryDTO.getGender());
            account.setStudent(student);
            student.setAccount(account);

            //- Set-up trước trong DB: 1: ROLE_USER, 2: ROLE_ADMIN
            Authority userAuthority = authorityRepository.findById("1")
                    .orElseThrow(() -> new RuntimeException(Response.notFound("Authority", "1")));
            account.setAuthorities(Collections.singletonList(userAuthority));
            userAuthority.getUsers().add(account);
            System.out.println("Student");
        } else if (Objects.equals(type, "teacher")) {
            //- ID được tạo ở Contructor
            Teacher teacher = new Teacher(registryDTO.getName(), registryDTO.getGender(), registryDTO.getPhone());
            account.setTeacher(teacher);
            teacher.setAccount(account);

            List<Authority> authorities = authorityRepository.findAll();
            account.setAuthorities(authorities);
            authorities.forEach(authority -> authority.getUsers().add(account));
            System.out.println("Teacher");
        }


        return accountRepository.save(account);
    }
}
