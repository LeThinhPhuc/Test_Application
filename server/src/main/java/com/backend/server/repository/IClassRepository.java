package com.backend.server.repository;

import com.backend.server.model.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IClassRepository extends JpaRepository<Class, String> {
}
