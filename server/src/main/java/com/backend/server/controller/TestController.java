package com.backend.server.controller;

import com.backend.server.DTO.ExamStatisticsDTO;
import com.backend.server.DTO.TestDTO;
import com.backend.server.model.ClassRoom;

import com.backend.server.DTO.QuestionAnswerDTO;
import com.backend.server.model.Question;
import com.backend.server.model.Response;
import com.backend.server.model.Student;
import com.backend.server.model.Test;
import com.backend.server.service.ClassRoomService;
import com.backend.server.service.TeacherService;
import com.backend.server.service.StudentService;
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
    private final StudentService studentService;
    private final ClassRoomService classRoomService;
    @Autowired
    public TestController(TestService testService, StudentService studentService, ClassRoomService classRoomService){
        this.testService=testService;
        this.studentService=studentService;
        this.classRoomService=classRoomService;
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

        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/getquestionsfortest/{testId}")
    public ResponseEntity<?> getQuestionsOfTest(@PathVariable String testId){
        try{
            Test test = testService.getTestById(testId);
            if(test != null){
                List<Question> questions = testService.getAllQuestionForTest(testId);
                return ResponseEntity.ok(questions);
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Test not found");
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/getstudentsfortest/{testId}")
    public ResponseEntity<?> getStudentsOfTest(@PathVariable String testId){
        try{
            Test test = testService.getTestById(testId);
            if(test != null){
                List<Student> students = testService.getAllStudentsForTest(testId);
                return ResponseEntity.ok(students);
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Test not found");
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/{classId}")
    public ResponseEntity<?> createTest(@PathVariable String classId, @RequestBody TestDTO testDTO) {
        if (testDTO.getClassRoomId() == null) {
            Response response = Response.of(HttpStatus.BAD_REQUEST, "ClassroomId is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try {
            Test testData = testService.createTest(testDTO);
            ClassRoom classRoom = classRoomService.getClassById(classId);
            testService.addStudentsToTest(testData.getId(), classRoom.getStudents());

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception ex) {
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/{testId}/students/{studentId}")
    public ResponseEntity<?> addStudentTest(@PathVariable String testId, @PathVariable String studentId){
        try{

            Test test = testService.getTestById(testId);
            if(test != null){
                testService.addStudentToTest(testId,studentId);
                return ResponseEntity.ok("Add student to test success");
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Test not found");
            }

        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/{testId}/students")
    public ResponseEntity<?> addStudentsTest(@PathVariable String testId, @RequestBody List<Student> students){
        try{
            Test test = testService.getTestById(testId);
            if(test != null){
                testService.addStudentsToTest(testId, students);
                return ResponseEntity.ok("Add students to test success");
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Test not found");
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

        }
    }

    @PostMapping("/{testId}/question")
    public ResponseEntity<?> addQuestionToTest(@PathVariable String testId, @RequestBody Question question){
        try{
            Test test = testService.getTestById(testId);
            if(test != null){
                testService.addQuestionToTest(testId, question);
                return ResponseEntity.ok("Add question to test success");
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Test not found");
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

        }
    }

    @PostMapping("/{testId}/questions")
    public ResponseEntity<?> addQuestionsToTest(@PathVariable String testId, @RequestBody List<Question> questions){
        try{
            Test test = testService.getTestById(testId);
            if(test != null){
                testService.addQuestionsToTest(testId, questions);
                return ResponseEntity.ok("Add questions to test success");
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Test not found");
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

        }
    }

    @PostMapping("/changefinished/{testId}")
    public ResponseEntity<?> changeFinished(@PathVariable String testId){
        try {
            Test test = testService.getTestById(testId);
            if(test != null){
                testService.toggleIsFinished(testId);
                return ResponseEntity.ok("Finished mode is : "+ testService.getTestById(testId).isFinished());
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Test not found");
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/changefixed/{testId}")
    public ResponseEntity<?> changeFixed(@PathVariable String testId){
        try {
            Test test = testService.getTestById(testId);
            if(test != null){
                testService.toggleIsFixed(testId);
                return ResponseEntity.ok("Fixed mode is : "+ testService.getTestById(testId).isFixed());
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Test not found");
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/changegetscore/{testId}")
    public ResponseEntity<?> changeGetScore(@PathVariable String testId){
        try {
            Test test = testService.getTestById(testId);
            if(test != null){
                testService.toggleIsGetScore(testId);
                return ResponseEntity.ok("Finished mode is : "+ testService.getTestById(testId).isFinished());
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Test not found");
            }
        }catch (Exception ex){
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

    @PutMapping("/{id}/studentscore/{studentId}")
    public ResponseEntity<?> updateScoreForStudent(@PathVariable String id, @PathVariable String studentId, @RequestBody double score){
        if(studentId==null||id==null){
            Response response = Response.of(HttpStatus.BAD_REQUEST, "ID Test and ID Student is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try {
            if(testService.getTestById(id)!=null||studentService.getStudentById(studentId)==null){
                testService.updateScoreForStudent(id, studentId, score);
                return ResponseEntity.ok("Update score success for student id +"+studentId+"with score "+score);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Test or Student not found with ID");
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}/studenttimestart/{studentId}")
    public ResponseEntity<?> updateTimeStartForStudent(@PathVariable String id, @PathVariable String studentId, @RequestBody String timeStart){
        if(studentId==null||id==null){
            Response response = Response.of(HttpStatus.BAD_REQUEST, "ID Test and ID Student is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try {
            if(testService.getTestById(id)!=null||studentService.getStudentById(studentId)==null){
                testService.updateStartDoTest(id, studentId, timeStart);
                return ResponseEntity.ok("Update score success for student id +"+studentId+"with timestart "+timeStart);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Test or Student not found with ID");
            }
        }catch (Exception ex){
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
