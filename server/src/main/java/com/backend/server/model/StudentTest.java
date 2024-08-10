package com.backend.server.model;

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
    @EmbeddedId
    private StudentTestId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("studentId")
    @JoinColumn(name = "studentId")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("testId")
    @JoinColumn(name = "testId")
    private Test test;

    @Column(name = "point")
    private double point;

    @Column(name = "startTime")
    private LocalDateTime startTime;
}
