package com.backend.server.controller;

import com.backend.server.DTO.StudentDTO;
import com.backend.server.DTO.StudentTestDTO;
import com.backend.server.DTO.StudentUpdateDTO;
import com.backend.server.DTO.TestDTO;
import com.backend.server.model.*;
import com.backend.server.repository.StudentTestRepository;
import com.backend.server.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

//    @GetMapping("/tests/{studentId}")
//    public ResponseEntity<?> getTestSForStudent(@PathVariable String studentId){
//        try {
//            List<StudentTest> studentTests = studentTestRepository.findByStudentId(studentId);
//            if (studentTests.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No tests found for this student.");
//            }
//
//            List<StudentTestDTO> studentTestDTOs = studentTests.stream().map(st -> {
//                StudentTestDTO dto = new StudentTestDTO();
//                dto.setStudent(new StudentDTO(st.getStudent().getId(), st.getStudent().getName(), st.getStudent().getPhone(), st.getStudent().getGender()));
//                dto.setTest(new TestDTO(st.getTest().getId(), st.getTest().getTestName()));
//                dto.setPoint(st.getPoint());
//                dto.setStartTime(st.getStartTime());
//                return dto;
//            }).collect(Collectors.toList());
//
//            return ResponseEntity.ok(studentTestDTOs);
//        } catch (Exception ex) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
//        }
//    }

    @GetMapping("/tests/{studentId}")
    public ResponseEntity<?> getTestsForStudent(@PathVariable String studentId) {
        try {
            // Tìm học sinh dựa trên studentId
            Student student = studentService.getStudentById(studentId);
            if (student == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found.");
            }

            // Lấy danh sách các lớp học của học sinh
            List<ClassRoom> classRooms = student.getClassRooms();

            // Lấy danh sách các bài thi từ các lớp học của học sinh
            Set<Test> tests = new HashSet<>();
            for (ClassRoom classRoom : classRooms) {
                tests.addAll(classRoom.getTests()); // Giả sử ClassRoom có phương thức getTests()
            }

            if (tests.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No tests found for this student.");
            }

            // Trả về danh sách các bài thi
            return ResponseEntity.ok(new ArrayList<>(tests));
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
