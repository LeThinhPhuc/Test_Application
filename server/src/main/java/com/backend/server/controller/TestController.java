package com.backend.server.controller;

import com.backend.server.DTO.ExamStatisticsDTO;
import com.backend.server.model.ClassRoom;
import com.backend.server.model.Response;
import com.backend.server.model.Student;
import com.backend.server.model.Test;
import com.backend.server.service.TeacherService;
import com.backend.server.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tests")
public class TestController {
    private final TestService testService;

    @Autowired
    public TestController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping
    public ResponseEntity<?> getAllTests() {
        try {
            List<Test> tests = testService.getAllTest();
            if (tests.size() == 0) {
                return ResponseEntity.ok("No Test yet !");
            } else {
                return ResponseEntity.ok(tests);
            }
        } catch (Exception ex) {
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTestById(@PathVariable String id) {
        if (id == null) {
            Response response = Response.of(HttpStatus.BAD_REQUEST, "ID is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try {
            Test test = testService.getTestById(id);
            if (test != null) {
                return ResponseEntity.ok(test);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Test not found");
            }
        } catch (Exception ex) {
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping
    public ResponseEntity<?> createTest(@RequestBody Test test) {
        if (test == null) {
            Response response = Response.of(HttpStatus.BAD_REQUEST, "Test is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try {
            testService.createTest(test);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception ex) {
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTest(@PathVariable String id, @RequestBody Test test) {
        if (test == null || id == null) {
            Response response = Response.of(HttpStatus.BAD_REQUEST, "ID and Test is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try {
            if (testService.getTestById(id) != null) {
//                test.setTestId(id);
                Test updatedTest = testService.updateTest(id, test);
                return ResponseEntity.ok(updatedTest);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Test not found with ID: " + id);
            }
        } catch (Exception ex) {
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTest(@PathVariable String id) {
        if (id == null) {
            Response response = Response.of(HttpStatus.BAD_REQUEST, "ID is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try {
            if (testService.getTestById(id) != null) {
                testService.deleteTest(id);
                return ResponseEntity.ok("Test Deleted Success");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Test not found with ID: " + id);
            }
        } catch (Exception ex) {
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //--------------------------------------------------
    //- API Statistics for Exam Results
    @GetMapping("/statistics")
    public ResponseEntity<?> statistics() {
        try {
            ExamStatisticsDTO statistics = testService.getStudentTests();
            return ResponseEntity.ok(statistics);
        } catch (Exception ex) {
            Response response = Response.of(HttpStatus.NOT_FOUND, ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
