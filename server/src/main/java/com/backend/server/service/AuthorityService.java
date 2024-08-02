package com.backend.server.service;

import com.backend.server.model.Authority;
import com.backend.server.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AuthorityService {
    private final AuthorityRepository authorityRepository;

    @Autowired
    public AuthorityService(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    @Transactional
    public List<Authority> getAllAuthoritiesByUsername(String username) {
        List<Authority> authorities = authorityRepository.findAuthoritiesByUsername(username);
        if(authorities == null) {
            throw new RuntimeException("Authorities not found with username: " + username);
        }

        return authorities;
    }
}
