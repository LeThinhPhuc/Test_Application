package com.backend.server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="classroom")
public class ClassRoom {
    @Id
    @Column(name="classroomid")
    private String classId;

    @Column(name="classroomname")
    private String className;

    @Column(name="schoolyear")
    private String schoolYear;

    @Column(name="semester")
    private String semester;


}
