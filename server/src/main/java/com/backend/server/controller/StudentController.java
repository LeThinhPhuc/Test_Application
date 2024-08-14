package com.backend.server.controller;

import com.backend.server.DTO.StudentUpdateDTO;
import com.backend.server.model.Response;
import com.backend.server.model.Student;
import com.backend.server.model.StudentTest;
import com.backend.server.repository.StudentTestRepository;
import com.backend.server.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/students")
public class StudentController {
    private final StudentService studentService;
    private final StudentTestRepository studentTestRepository;

    @Autowired
    public StudentController(StudentService studentService, StudentTestRepository studentTestRepository) {
        this.studentService = studentService;
        this.studentTestRepository=studentTestRepository;
    }

    // Get all students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    // Get a single student by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable String id) {
        try {
            Student student = studentService.getStudentById(id);
            return ResponseEntity.ok(student);
        } catch (Exception ex) {
            Response response = Response.of(HttpStatus.NOT_FOUND, ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @GetMapping("/tests/{studentId}")
    public ResponseEntity<?> getTestSForStudent(@PathVariable String studentId){
        try {
            // Tìm tất cả các bài thi của học sinh dựa trên studentId
            List<StudentTest> studentTests = studentTestRepository.findByStudentId(studentId);

            if (studentTests.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No tests found for this student.");
            }

            // Trả về danh sách các bài thi
            return ResponseEntity.ok(studentTests);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }

    // Update a student
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable String id, @RequestBody StudentUpdateDTO student) {
        try {
            Student updatedStudent = studentService.updateStudent(id, student);
            return ResponseEntity.ok(updatedStudent);
        } catch (Exception ex) {
            Response response = Response.of(HttpStatus.BAD_REQUEST, ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
