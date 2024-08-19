package com.backend.server.repository;

import com.backend.server.model.StudentTest;
import com.backend.server.model.StudentTestId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentTestRepository extends JpaRepository<StudentTest, StudentTestId> {
    List<StudentTest> findByStudentId(String studentId);
    @Query(value = "SELECT * FROM Student_Test where testId = :testId", nativeQuery = true)
    List<StudentTest> findAllByTestId(@Param("testId") String testId);

}
