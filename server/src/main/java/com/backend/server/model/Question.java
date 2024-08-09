package com.backend.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "question")
public class Question {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "type")
    private String type;  // e.g., "Multiple Choice", "True/False", "Short Answer"

    @Column(name = "topic")
    private String topic; // e.g., "Mathematics", "Science"

    @Column(name = "content")
    private String content; // Nội dung câu hỏi

    @Column(name = "point")
    private double point;

    @ManyToMany(mappedBy = "questions",
            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<Test> tests;

    @OneToMany(mappedBy = "question")
    private List<Answer> answers;
}
