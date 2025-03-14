package com.backend.server.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;

@Getter
@Setter
public class TestDTO {
    private String id;
    private String testName;
    private Integer testTime;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date testDay;

    @Temporal(TemporalType.TIME)
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime timeStart;

    @Temporal(TemporalType.TIME)
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime timeEnd;

    private String classRoomId;

    public TestDTO(String id, String testName){
        this.id=id;
        this.testName=testName;
    }
}
