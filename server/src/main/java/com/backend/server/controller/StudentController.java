package com.backend.server.controller;

import com.backend.server.DTO.StudentUpdateDTO;
import com.backend.server.model.Response;
import com.backend.server.model.Student;
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

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
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
