package com.backend.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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

    @OneToOne(
            cascade = CascadeType.ALL)
    @JoinColumn(name = "accountId")
    private Account account;


}
