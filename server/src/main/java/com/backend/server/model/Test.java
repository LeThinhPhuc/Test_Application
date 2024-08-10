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
@Table(name = "test")
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "testid")
    private String testId;

    @Column(name = "testname")
    private String testName;

    @Column(name = "testtime")
    private Integer testTime;

    @Column(name = "testday")
    @Temporal(TemporalType.DATE)
    private Date testDay;

    @Column(name = "timestart")
    @Temporal(TemporalType.TIME)
    private Date timeStart;

    @Column(name = "timeend")
    @Temporal(TemporalType.TIME)
    private Date timeEnd;

    //! Getter Setter Construcor dùng lombok cho nhanh/gọn


    //    @ManyToMany(mappedBy = "tests",
//            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
//    private List<Student> students;
    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentTest> studentTests;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "test_question",
            joinColumns = @JoinColumn(name = "testId"),
            inverseJoinColumns = @JoinColumn(name = "questionId")
    )
    private List<Question> questions;


    @ManyToOne
    @JoinColumn(name="classroomid")
    private ClassRoom classRoom;

}
