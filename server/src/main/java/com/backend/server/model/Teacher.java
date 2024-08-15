package com.backend.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name="Teacher")
public class Teacher {
    @Id
    @Column(name="teacherId")
    private String teacherId;

    @Column(name="fullName")
    private String fullName;

    @Column(name="phoneNumber")
    private String phoneNumber;

    @Column(name="gender")
    private String gender;

    @JsonIgnore
    @OneToMany(mappedBy = "teacher")
    private List<ClassRoom> classRooms;

    @JsonIgnore
    @OneToOne(
            cascade = CascadeType.ALL)
    @JoinColumn(name = "accountId")
    private Account account;

    public Teacher(String fullName, String gender, String phoneNumber) {
        this.teacherId = GenerateID.generateID();
        this.fullName = fullName;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        //- Account set ở ngoài
        this.classRooms = new ArrayList<>();
    }
}
