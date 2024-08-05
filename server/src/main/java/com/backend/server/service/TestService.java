package com.backend.server.service;

import com.backend.server.model.*;
import com.backend.server.repository.QuestionRepository;
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

    private final QuestionRepository questionRepository;
    @Autowired
    public TestService(TestRepository testRepository, StudentTestRepository studentTestRepository, QuestionRepository questionRepository){
        this.testRepository = testRepository;
        this.studentTestRepository=studentTestRepository;
        this.questionRepository =questionRepository;
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
        studentTestRepository.deleteAll(test.getStudentTests());
        testRepository.delete(test);


        for (Question question : test.getQuestions()){
            question.getTests().remove(test);
            questionRepository.save(question);
        }
        test.getQuestions().clear();
        testRepository.delete(test);
        //        for(StudentTest student: test.getStudentTests()){
//            student
//        }
//        classRoom.getStudents().clear();
//        classRoomRepository.delete(classRoom);


    }
    
    
}
