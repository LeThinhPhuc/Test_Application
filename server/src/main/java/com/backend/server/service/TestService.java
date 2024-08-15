package com.backend.server.service;

import com.backend.server.DTO.ExamStatisticsDTO;
import com.backend.server.DTO.TestDTO;
import com.backend.server.model.*;
import com.backend.server.repository.QuestionRepository;
import com.backend.server.repository.StudentRepository;
import com.backend.server.repository.StudentTestRepository;
import com.backend.server.repository.TestRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.*;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TestService {
    private final TestRepository testRepository;

    private final StudentTestRepository studentTestRepository;

    private final StudentRepository studentRepository;

    private final StudentService studentService;

    private final QuestionRepository questionRepository;

    private final QuestionService questionService;
    private final ClassRoomService classRoomService;


    private final AnswerService answerService;
    @Autowired
    public TestService(TestRepository testRepository, StudentTestRepository studentTestRepository, QuestionRepository questionRepository, QuestionService questionService, StudentRepository studentRepository, AnswerService answerService, StudentService studentService, ClassRoomService classRoomService){
        this.testRepository = testRepository;
        this.studentTestRepository = studentTestRepository;
        this.questionRepository = questionRepository;
        this.questionService = questionService;
        this.studentRepository =studentRepository;
        this.answerService = answerService;
        this.studentService=studentService;
        this.classRoomService=classRoomService;
    }

//    public Test createTest(Test test) {
//        test.setId(GenerateID.generateID());
//        return testRepository.save(test);
//    }

    public Test createTest(TestDTO testDTO) {
        Test test=new Test();
        test.setId(GenerateID.generateID());
        test.setTestName(testDTO.getTestName());
        test.setTestDay(testDTO.getTestDay());
        test.setTimeEnd(testDTO.getTimeEnd());
        test.setTimeStart(testDTO.getTimeStart());
        test.setTestTime(testDTO.getTestTime());
        test.setClassRoom(classRoomService.getClassById(testDTO.getClassRoomId()));
        return testRepository.save(test);
    }

    public Test getTestById(String id) {
        return testRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Test not found with ID: " + id));
    }

    public List<Test> getAllTest() {
        return testRepository.findAll();
    }


    public List<Question> getAllQuestionForTest(String testId) {
        Test test = getTestById(testId);
        return test.getQuestions();
    }

//    LẤY DS HS CHO TEST, LẤY CLASS R VỚI GET STUDENT
    public List<Student> getAllStudentsForTest(String testId){
        Test test= getTestById(testId);
        return test.getClassRoom().getStudents();
    }

    public Test updateTest(String id, Test updatedTest){
        Test testInfo = getTestById(id);
        if (updatedTest.getTestDay() != null) {
            testInfo.setTestDay(updatedTest.getTestDay());
        }
        if (updatedTest.getTestTime() != null) {
            testInfo.setTestTime(updatedTest.getTestTime());
        }
        if (updatedTest.getTimeStart() != null) {
            testInfo.setTimeStart(updatedTest.getTimeStart());
        }
        if (updatedTest.getTimeEnd() != null) {
            testInfo.setTimeEnd(updatedTest.getTimeEnd());
        }
        if (updatedTest.getTestName() != null) {
            testInfo.setTestName(updatedTest.getTestName());
        }
        return testRepository.save(testInfo);
    }

    public void deleteTest(String id) {
        Test test = testRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Test not found with ID: " + id));

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

    public Test addQuestionToTest(String testId, Question questionData) {
        // Kiểm tra xem Test có tồn tại không
        Test test = testRepository.findById(testId).orElseThrow(() -> new RuntimeException("Test not found"));

        // Kiểm tra xem câu hỏi đã tồn tại chưa dựa trên ID của câu hỏi (nếu có)
        Optional<Question> existingQuestion = questionRepository.findById(questionData.getId());
        Question question;

        if (existingQuestion.isPresent()) {
            // Nếu câu hỏi đã tồn tại, sử dụng lại câu hỏi này
            question = existingQuestion.get();
        } else {
            // Nếu câu hỏi chưa tồn tại, tạo mới câu hỏi
            question = questionService.createQuestion(questionData);
        }

        // Kiểm tra xem câu hỏi đã có trong bài kiểm tra chưa
        if (!test.getQuestions().contains(question)) {
            // Thêm câu hỏi vào danh sách câu hỏi của bài kiểm tra
            test.getQuestions().add(question);
            // Thêm bài kiểm tra vào danh sách các bài kiểm tra liên quan đến câu hỏi
            question.getTests().add(test);
        }

        // Lưu bài kiểm tra và các câu hỏi liên quan
        return testRepository.save(test);
    }

    public void addQuestionsToTest(String testId, List<Question> questions) {
        for (Question question : questions) {
            addQuestionToTest(testId, question);
        }
    }


    public Test addStudentToTest(String testId, String studentId) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found"));

        Student student = studentService.getStudentById(studentId);
        if (student == null) {
            throw new RuntimeException("Student not found");
        }

        // Kiểm tra xem học sinh đã có trong danh sách bài test chưa
        boolean studentAlreadyExists = test.getStudentTests().stream()
                .anyMatch(studentTest -> studentTest.getStudent().getId().equals(studentId));

        if (!studentAlreadyExists) {
            // Nếu chưa có, tạo một StudentTest mới và thêm vào bài test
            StudentTest studentTest = new StudentTest();
            studentTest.setStudent(student);
            studentTest.setTest(test);

            // Thiết lập các thuộc tính cần thiết
            studentTest.setPoint(0); // Ví dụ điểm khởi tạo là 0
            studentTest.setStartTime(LocalDateTime.now()); // Ví dụ thời gian bắt đầu là hiện tại

            test.getStudentTests().add(studentTest);
            student.getClassRooms().add(test.getClassRoom()); // Nếu cần thêm học sinh vào lớp của bài test

            testRepository.save(test);
        }

        return test;
    }



    public void addStudentsToTest(String testId, List<Student> students) throws IllegalAccessException {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new EntityNotFoundException("Test not found with ID: " + testId));

        for (Student student : students) {
            addStudentToTest(testId, student.getId()); // Gọi phương thức đã có để thêm học sinh vào test
        }
    }

    public void updateScoreForStudent(String testId, String studentId, double score){
        Test test = testRepository.findById(testId).orElseThrow(()-> new EntityNotFoundException("Test not found with ID: "+testId));
        StudentTest studentTest =  test.getStudentTests().stream().filter(ts->ts.getStudent().getId().equals(studentId)).findFirst().orElseThrow(()-> new EntityNotFoundException("Student not found with ID: "+studentId));

        studentTest.setPoint(score);
        testRepository.save(test);

    }

    public ExamStatisticsDTO getStudentTests() {
        List<StudentTest> studentTests = studentTestRepository.findAll();

        // TreeMap to automatically sort scores in ascending order
        Map<Double, Integer> scoreMap = new TreeMap<>();
        double totalScore = 0;
        int totalCount = 0;
        StudentTest topScorer = null;

        for (StudentTest t : studentTests) {
            double score = t.getPoint();
            scoreMap.put(score, scoreMap.getOrDefault(score, 0) + 1);
            totalScore += score;
            totalCount++;

            // Determine the top scorer
            if (topScorer == null || t.getPoint() > topScorer.getPoint()) {
                topScorer = t;
            }
        }

        // Calculate the average score and round to 2 decimal places
        double average = totalCount == 0 ? 0 : totalScore / totalCount;
        BigDecimal roundedAverage = new BigDecimal(average).setScale(2, RoundingMode.HALF_UP);

        // Convert Map to List<Map<String, Object>> for score distribution
        List<Map<String, Object>> result = new ArrayList<>();
        scoreMap.forEach((score, total) -> {
            Map<String, Object> map = new HashMap<>();
            map.put("score", score);
            map.put("total", total);
            result.add(map);
        });

        // Create the DTO
        ExamStatisticsDTO statisticsDTO = new ExamStatisticsDTO();
        statisticsDTO.setAverage(roundedAverage.doubleValue());
        statisticsDTO.setTopScorer(topScorer);
        statisticsDTO.setScoreDistribution(result);

        return statisticsDTO;
    }


    public void updateStartDoTest(String testId, String studentId, String startTime){
        Test test = testRepository.findById(testId).orElseThrow(()->new EntityNotFoundException("Test not found with ID: "+testId));
        StudentTest studentTest = test.getStudentTests().stream().filter(ts->ts.getStudent().getId().equals(studentId)).findFirst().orElseThrow(()-> new EntityNotFoundException("Student not found with ID: "+ studentId));
        studentTest.setStartTime(LocalDateTime.parse(startTime));
        testRepository.save(test);
    }
}
