package com.backend.server.repository;

import com.backend.server.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, String> {
    @Query(value = "SELECT A.* FROM account_authority UA " +
            "JOIN authority A ON UA.authorityId = A.id " +
            "JOIN account U ON U.id = UA.accountId " +
            "WHERE U.username = :username", nativeQuery = true)
    List<Authority> findAuthoritiesByUsername(@Param("username") String username);
}
