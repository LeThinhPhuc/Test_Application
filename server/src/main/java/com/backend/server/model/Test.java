    package com.backend.server.model;

    import com.fasterxml.jackson.annotation.JsonFormat;
    import com.fasterxml.jackson.annotation.JsonIgnore;
    import com.fasterxml.jackson.annotation.JsonManagedReference;
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import org.hibernate.annotations.ColumnDefault;

    import java.time.LocalTime;
    import java.util.ArrayList;
    import java.util.Date;
    import java.util.List;
    import java.util.UUID;

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Entity
    @Table(name = "Test")
    public class Test {
        @Id
        @Column(name = "id")
        private String id;

        @Column(name = "testName")
        private String testName;

        @Column(name = "testTime")
        private Integer testTime;

        @Column(name = "testDay")
        @Temporal(TemporalType.DATE)
        @JsonFormat(pattern = "yyyy-MM-dd")
        private Date testDay;

        @Column(name = "timeStart")
        @Temporal(TemporalType.TIME)
        @JsonFormat(pattern = "HH:mm:ss")
        private LocalTime timeStart;

        @Column(name = "timeEnd")
        @Temporal(TemporalType.TIME)
        @JsonFormat(pattern = "HH:mm:ss")
        private LocalTime timeEnd;

        @Column(name="isGetScore")
        private boolean isGetScore=false;

        @Column(name="isFixed")
        private boolean isFixed=false;

        @Column(name="isFinished")
        private boolean isFinished=false;


        //    @ManyToMany(mappedBy = "tests",
    //            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    //    private List<Student> students;
        @JsonManagedReference
        @OneToMany(mappedBy = "test",
                cascade = CascadeType.ALL, orphanRemoval = true)
        private List<StudentTest> studentTests= new ArrayList<>();;

        @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
        @JoinTable(
                name = "Test_Question",
                joinColumns = @JoinColumn(name = "testId"),
                inverseJoinColumns = @JoinColumn(name = "questionId")
        )
        private List<Question> questions= new ArrayList<>();;


        @JsonIgnore
        @ManyToOne
        @JoinColumn(name = "classRoomId")
        private ClassRoom classRoom;

    }
