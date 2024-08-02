package com.backend.server.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name="answer")
public class Answer {
    @Id
    @Column(name="answerid")
    private String answerId;

    @Column(name = "contentanswer")
    private String contentAnswer;

    @Column(name="optionanswer")
    private String optionAnswer;

    @ManyToOne
    @JoinColumn(name="questionid")
    private Question question;


}
