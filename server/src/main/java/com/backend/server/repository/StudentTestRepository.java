package com.backend.server.repository;

import com.backend.server.model.StudentTest;
import com.backend.server.model.StudentTestId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentTestRepository extends JpaRepository<StudentTest, StudentTestId> {
}
