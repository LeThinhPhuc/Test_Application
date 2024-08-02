package com.backend.server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

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
}
