package com.backend.server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
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

}
