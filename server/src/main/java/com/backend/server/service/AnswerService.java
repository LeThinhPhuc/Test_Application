package com.backend.server.service;

import com.backend.server.model.Answer;
import com.backend.server.model.GenerateID;
import com.backend.server.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    @Autowired
    public AnswerService(AnswerRepository answerRepository){
        this.answerRepository = answerRepository;
    }

    public Answer createAnswer(Answer answer){
        answer.setId(GenerateID.generateID());
        return answerRepository.save(answer);
    }
}
