package com.backend.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Student")
public class Student {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "gender")
    private String gender;

    public Student(String id, String phone, String name, String gender) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.gender = gender;
        //- Account set ở ngoài
        this.studentTests = new ArrayList<StudentTest>();
        this.classRooms = new ArrayList<ClassRoom>();
    }

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "accountId")
    private Account account;

    //    @JsonIgnore
    @JsonBackReference
    @OneToMany(mappedBy = "student",
            cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentTest> studentTests;

    //    @JsonIgnore
    @JsonBackReference
    @ManyToMany(mappedBy = "students",
            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<ClassRoom> classRooms;
}
