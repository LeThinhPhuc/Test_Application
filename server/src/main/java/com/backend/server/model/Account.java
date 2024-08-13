package com.backend.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Account")
public class Account {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "enabled")
    private Integer enabled;

    public Account(String username, String password) {
        //- ID
        this.id = GenerateID.generateID();
        this.username = username;
        this.password = password;
        this.enabled = 1;
        this.authorities = new ArrayList<>(); //!
        //- Student set ở ngoài
        this.teacher = null;
    }

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "Account_Authority",
            joinColumns = @JoinColumn(name = "accountId"),
            inverseJoinColumns = @JoinColumn(name = "authorityId")
    )
    private List<Authority> authorities;

    @OneToOne(mappedBy = "account",
            cascade = CascadeType.ALL)
    private Student student;

    @OneToOne(mappedBy = "account",
            cascade = CascadeType.ALL)
    private Teacher teacher;
}
