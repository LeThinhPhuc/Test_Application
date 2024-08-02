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
@Table(name="classroom")
public class ClassRoom {
    @Id
    @Column(name="classroomid")
    private String classRoomId;

    @Column(name="classroomname")
    private String classRoomName;

    @Column(name="schoolyear")
    private String schoolYear;

    @Column(name="semester")
    private String semester;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "classroom_student",
            joinColumns = @JoinColumn(name = "classroomId"),
            inverseJoinColumns = @JoinColumn(name = "studentId")
    )
    private List<Student> students;

    @ManyToOne
    @JoinColumn(name="teacherid")
    private Teacher teacher;

}
