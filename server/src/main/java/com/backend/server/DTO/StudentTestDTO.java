package com.backend.server.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class StudentTestDTO {
    private StudentDTO student;
    private TestDTO test; // DTO cho Test
    private double point;
    private LocalDateTime startTime;
}
