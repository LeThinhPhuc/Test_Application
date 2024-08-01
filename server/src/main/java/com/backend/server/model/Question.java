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

    @Column(name = "answer")
    private String answer;

//    @Column(name = "options")
//    private String options;
    //Note: Options này cho các câu hỏi trắc nghiệm, tách nhau bằng dấu |
    //Ví dụ: option1|option2|option3

    @Column(name = "point")
    private double point;

    @ManyToMany(mappedBy = "questions",
            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<Test> tests;
}
