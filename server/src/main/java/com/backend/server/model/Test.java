package com.backend.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Test")
public class Test {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "testName")
    private String testName;

    @Column(name = "testTime")
    private Integer testTime;

    @Column(name = "testDay")
    @Temporal(TemporalType.DATE)
    private Date testDay;

    @Column(name = "timeStart")
    @Temporal(TemporalType.TIME)
    private Date timeStart;

    @Column(name = "timeEnd")
    @Temporal(TemporalType.TIME)
    private Date timeEnd;


    //    @ManyToMany(mappedBy = "tests",
//            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
//    private List<Student> students;
    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentTest> studentTests;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "Test_Question",
            joinColumns = @JoinColumn(name = "testId"),
            inverseJoinColumns = @JoinColumn(name = "questionId")
    )
    private List<Question> questions;


    @ManyToOne
    @JoinColumn(name = "classRoomId")
    private ClassRoom classRoom;

}
