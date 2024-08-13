package com.backend.server.service;

import com.backend.server.model.Answer;
import com.backend.server.model.Question;
import com.backend.server.model.Test;
import com.backend.server.repository.AnswerRepository;
import com.backend.server.repository.QuestionRepository;
import com.backend.server.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final TestRepository testRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository, AnswerRepository answerRepository, TestRepository testRepository) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.testRepository = testRepository;
    }

    // Helper method to find a question by ID
    private Question findQuestionById(String id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with ID: " + id));
    }

    // Retrieve all questions
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    // Retrieve a question by ID
    public Question getQuestionById(String id) {
        return findQuestionById(id);
    }

    // Create a new question
    @Transactional
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    // Update a question
    @Transactional
    public Question updateQuestion(String id, Question updatedQuestion) {
        Question question = findQuestionById(id);

        if (updatedQuestion.getContent() != null) {
            question.setContent(updatedQuestion.getContent());
        }

        return questionRepository.save(question);
    }

    // Delete a question
    @Transactional
    public void deleteQuestion(String id) {
        Question question = findQuestionById(id);

        // Remove all answers related to this question
        answerRepository.deleteAll(question.getAnswers());

        // Remove associations with tests
        for (Test test : question.getTests()) {
            test.getQuestions().remove(question);
//            testRepository.save(test); // Assuming TestRepository exists and has a save method
        }

        // Finally, delete the question itself
        questionRepository.delete(question);
    }
}
