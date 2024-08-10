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
@Table(name="Answer")
public class Answer {
    @Id
    @Column(name="id")
    private String id;

    @Column(name="content")
    private String content; //- Nội dung câu trả lời

    @Column(name="isCorrect")
    private String isCorrect;

    @ManyToOne
    @JoinColumn(name="questionId")
    private Question question;
}
