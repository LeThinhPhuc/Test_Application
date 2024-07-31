package com.backend.server.controller;

import com.backend.server.model.Teacher;
import com.backend.server.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @GetMapping
    public List<Teacher> getAllTeachers(){
        return teacherService.getAllTeachers();
    }

    @GetMapping("/{id}")
    public Teacher getUserById(@PathVariable String id){
        return teacherService.getTeacherById(id);
    }

    @PostMapping
    public void createTeacher(@RequestBody Teacher teacher){
        teacherService.createTeacher(teacher);
    }

    @PutMapping
    public void updateTeacher(@RequestBody Teacher teacher){
        teacherService.updateTeacher(teacher);
    }

    @PutMapping("/{id}")
    public void updateTeacherById(@PathVariable String id,@RequestBody Teacher teacher){
        teacher.setTeacherId(id);
        teacherService.updateTeacher(teacher);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacherById(@PathVariable String id){
        teacherService.deleteTeacherById(id);
    }

}
