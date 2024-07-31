//package com.backend.server.model;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.util.List;
//
//
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//@Entity
//@Table(name = "authority")
//
////public class Authority implements GrantedAuthority {
//
//public class Authority {
//    @Id
//    @Column(name = "id")
//    private String id;
//
//    @Column(name = "authority")
//    private String authority;
//
//    @ManyToMany(mappedBy = "authorities",
//            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
//    private List<Account> users;
//}
