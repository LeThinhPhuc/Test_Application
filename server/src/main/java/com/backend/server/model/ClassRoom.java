package com.backend.server.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name="ClassRoom")
public class ClassRoom {
    @Id
    @Column(name="classRoomId")
    private String classRoomId;

    @Column(name="classRoomName")
    private String classRoomName;

    @Column(name="schoolYear")
    private String schoolYear;

    @Column(name="semester")
    private String semester;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "Classroom_Student",
            joinColumns = @JoinColumn(name = "classroomId"),
            inverseJoinColumns = @JoinColumn(name = "studentId")
    )
    private List<Student> students;

    @ManyToOne
    @JoinColumn(name="teacherId")
    private Teacher teacher;

    @OneToMany(mappedBy = "classRoom",  cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Test> tests;
}
