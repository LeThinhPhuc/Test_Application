package com.backend.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.awt.print.Book;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Student_Test")
public class StudentTest {
    @JsonIgnore
    @EmbeddedId
    private StudentTestId id;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("studentId")
    @JoinColumn(name = "studentId")
    private Student student;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("testId")
    @JoinColumn(name = "testId")
    private Test test;

    @Column(name = "point")
    private double point;

    @Column(name = "startTime")
    private LocalDateTime startTime;
}
