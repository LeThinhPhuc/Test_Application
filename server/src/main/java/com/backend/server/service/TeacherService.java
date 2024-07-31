package com.backend.server.service;

import com.backend.server.model.Teacher;
import com.backend.server.repository.ITeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {
    @Autowired
    private ITeacherRepository teacherRepository;

    public void createTeacher(Teacher teacher){
        teacherRepository.save(teacher);
    }

    public void updateTeacher(Teacher teacher){
        teacherRepository.save(teacher);
    }

    public void deleteTeacherById(String id){
        teacherRepository.deleteById(id);
    }

    public Teacher getTeacherById(String id){
        return teacherRepository.findById(id).orElse(null); // có thể thay null thành 1 đối tượng teacher cụ thể
    }

    public List<Teacher> getAllTeachers(){
        return teacherRepository.findAll();
    }


}
