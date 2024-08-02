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
@Table(name="teacher")
public class Teacher {
    @Id
    @Column(name="teacherid")
    private String teacherId;

    @Column(name="fullname")
    private String fullName;

    @Column(name="phonenumber")
    private String phoneNumber;

    @Column(name="gender")
    private String gender;

    @OneToMany(mappedBy = "teacher")
    private List<Test> tests;

    @OneToMany(mappedBy = "teacher")
    private List<ClassRoom> classRooms;

    @OneToOne(fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JoinColumn(name = "accountId")
    private Account account;
}
