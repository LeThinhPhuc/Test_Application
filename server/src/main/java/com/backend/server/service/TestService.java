package com.backend.server.service;

import com.backend.server.model.*;
import com.backend.server.repository.QuestionRepository;
import com.backend.server.repository.StudentRepository;
import com.backend.server.repository.StudentTestRepository;
import com.backend.server.repository.TestRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {
    private final TestRepository testRepository;

    private final StudentTestRepository studentTestRepository;

    private final StudentRepository studentRepository;

    private final QuestionRepository questionRepository;

    private final QuestionService questionService;
    @Autowired
    public TestService(TestRepository testRepository, StudentTestRepository studentTestRepository, QuestionRepository questionRepository, QuestionService questionService, StudentRepository studentRepository){
        this.testRepository = testRepository;
        this.studentTestRepository=studentTestRepository;
        this.questionRepository =questionRepository;
        this.questionService = questionService;
        this.studentRepository =studentRepository;
    }

    public Test createTest(Test test){
        return testRepository.save(test);
    }

    public Test getTestById(String id){
        return testRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Test not found with ID: " + id));
    }

    public List<Test> getAllTest(){
        return testRepository.findAll();
    }

    public Test updateTest(String id, Test updatedTest){
        Test testInfo = getTestById(id);
        if(updatedTest.getTestDay()!=null){
            testInfo.setTestDay(updatedTest.getTestDay());
        }
        if(updatedTest.getTestTime()!=null){
            testInfo.setTestTime(updatedTest.getTestTime());
        }
        if(updatedTest.getTimeStart()!=null){
            testInfo.setTimeStart(updatedTest.getTimeStart());
        }
        if(updatedTest.getTimeEnd()!=null){
            testInfo.setTimeEnd(updatedTest.getTimeEnd());
        }
        if(updatedTest.getTestName()!=null){
            testInfo.setTestName(updatedTest.getTestName());
        }
        return testRepository.save(testInfo);
    }

    public void deleteTest(String id){
        Test test = testRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Test not found with ID: "+id));

        // n-n BẢNG PHỤ CÓ THUỘC TÍNH

//        studentTestRepository.deleteAll(test.getStudentTests());
//        testRepository.delete(test);





        // n-n BẢNG PHỤ KHÔNG CÓ THUỘC TÍNH

//        for (Question question : test.getQuestions()){
//            question.getTests().remove(test);
//            questionRepository.save(question);
//        }
//        test.getQuestions().clear();
//        testRepository.delete(test);




        //        for(StudentTest student: test.getStudentTests()){
//            student
//        }
//        classRoom.getStudents().clear();
//        classRoomRepository.delete(classRoom);

        testRepository.delete(test);

    }

    public Test addQuestionToTest(String testId, Question questionData){
        Test test = testRepository.findById(testId).orElseThrow(()->new RuntimeException("Test not found"));
        Question question = questionService.createQuestion(questionData);
        test.getQuestions().add(question);
        question.getTests().add(test);
        return testRepository.save(test);
    }

    public void addQuestionsToTest(String testId, List<Question> questions){
        for (Question question:questions){
            addQuestionToTest(testId, question);
        }
    }

    public void addStudentToTest(String testId, String studentId) throws IllegalAccessException {
        Test test = testRepository.findById(testId).orElseThrow(()->new EntityNotFoundException("Test not found with ID: "+testId));
        Student student = studentRepository.findById(studentId).orElseThrow(()->new EntityNotFoundException("Student not found with ID: "+studentId));
        boolean alreadyExists = test.getStudentTests().stream().anyMatch(ts -> ts.getStudent().getId().equals(studentId));
        if(alreadyExists){
            throw new IllegalAccessException("Student is allready in this test");
        }
        StudentTest studentTest = new StudentTest();
        studentTest.setTest(test);
        studentTest.setStudent(student);

        test.getStudentTests().add(studentTest);
        student.getStudentTests().add(studentTest);

        testRepository.save(test);
    }

    public void addStudentsToTest(String testId, List<Student> students) throws IllegalAccessException {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new EntityNotFoundException("Test not found with ID: " + testId));

        for (Student student : students) {
            addStudentToTest(testId, student.getId()); // Gọi phương thức đã có để thêm học sinh vào test
        }
    }
    public void updateScoreForStudent(String testId, String studentId, float score){
        Test test = testRepository.findById(testId).orElseThrow(()-> new EntityNotFoundException("Test not found with ID: "+testId));
        StudentTest studentTest =  test.getStudentTests().stream().filter(ts->ts.getStudent().getId().equals(studentId)).findFirst().orElseThrow(()-> new EntityNotFoundException("Student not found with ID: "+studentId));
        studentTest.setPoint(score);
        testRepository.save(test);

    }
    
    
}
