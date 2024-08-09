package com.backend.server.service;

import com.backend.server.model.Account;
import com.backend.server.model.AccountPrincipal;
import com.backend.server.model.Authority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final AccountService accountService;
    private final AuthorityService authorityService;

    @Autowired
    public CustomUserDetailsService(AccountService accountService, AuthorityService authorityService) {
        this.accountService = accountService;
        this.authorityService = authorityService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountService.getAccountByUsername(username);
        if (account == null) {
            throw new UsernameNotFoundException("Account not found");
        }

        //- load Authorities
        List<Authority> authorities = authorityService.getAllAuthoritiesByUsername(username);
        account.setAuthorities(Objects.requireNonNullElseGet(authorities, List::of));

        return new AccountPrincipal(account);
    }
}


