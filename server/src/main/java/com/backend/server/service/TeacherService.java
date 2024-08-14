package com.backend.server.service;

import com.backend.server.model.ClassRoom;
import com.backend.server.model.GenerateID;
import com.backend.server.model.Teacher;
import com.backend.server.repository.ITeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    private final ITeacherRepository teacherRepository;

    public TeacherService(ITeacherRepository teacherRepository){
        this.teacherRepository=teacherRepository;
    }

    public void createTeacher(Teacher teacher){
        teacher.setTeacherId(GenerateID.generateID());
        teacherRepository.save(teacher);
    }

    public Teacher updateTeacher(String id, Teacher teacher){
        Teacher teacherInfo = getTeacherById(id);
        if(teacher.getGender()!=null){
            teacherInfo.setGender(teacher.getGender());
        }
        if(teacher.getFullName()!=null){
            teacherInfo.setFullName(teacher.getFullName());
        }
        if(teacher.getPhoneNumber()!=null){
            teacherInfo.setPhoneNumber(teacher.getPhoneNumber());
        }
        return teacherRepository.save(teacherInfo);
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

    public List<ClassRoom> getAllClassForTeacher(String teacherId){
        Teacher teacher = getTeacherById(teacherId);
        return teacher.getClassRooms();
    }



}
