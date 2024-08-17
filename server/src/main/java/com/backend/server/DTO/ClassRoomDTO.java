package com.backend.server.DTO;

import com.backend.server.model.Student;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ClassRoomDTO {
    private String classRoomName;
    private String schoolYear;
    private String semester;
    private String teacherId;

    private List<StudentDTO> students;
}
