package com.backend.server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="class")
public class Class {
    @Id
    @Column(name="classid")
    private String classId;


}
