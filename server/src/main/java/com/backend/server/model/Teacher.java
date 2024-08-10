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

    @OneToMany(mappedBy = "teacher")
    private List<ClassRoom> classRooms;

    @OneToOne(fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JoinColumn(name = "accountId")
    private Account account;


}
