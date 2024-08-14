package com.backend.server.DTO;

import com.backend.server.model.Answer;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class QuestionAnswerDTO {
    private String questionId;
    private String content;
    private List<Answer> answers;

}
