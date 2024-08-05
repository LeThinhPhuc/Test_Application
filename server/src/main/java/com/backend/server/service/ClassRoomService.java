package com.backend.server.service;

import com.backend.server.model.ClassRoom;
import com.backend.server.model.Student;
import com.backend.server.repository.IClassRoomRepository;
import com.backend.server.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassRoomService {
    private final IClassRoomRepository classRoomRepository;

    private final StudentRepository studentRepository;

    @Autowired
    public ClassRoomService(IClassRoomRepository classRoomRepository, StudentRepository studentRepository){
        this.classRoomRepository = classRoomRepository;
        this.studentRepository = studentRepository;
    }

    public ClassRoom createClass(ClassRoom classRoom){
        return classRoomRepository.save(classRoom);
    }

    public ClassRoom getClassById(String id){
        return classRoomRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Class not found with ID: " + id));
    }

    public List<ClassRoom> getAllClass(){
        return classRoomRepository.findAll();
    }

    public ClassRoom updateClass(String id, ClassRoom updatedClass){
        ClassRoom classInfo = getClassById(id);
        if(updatedClass.getClassRoomName()!=null){
            classInfo.setClassRoomName(updatedClass.getClassRoomName());
        }
        if(updatedClass.getSemester()!=null){
            classInfo.setSemester(updatedClass.getSemester());
        }
        if(updatedClass.getSchoolYear()!=null){
            classInfo.setSchoolYear(updatedClass.getSchoolYear());
        }
        return classRoomRepository.save(classInfo);
    }

    public void deleteClass(String id){
        ClassRoom classRoom = classRoomRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Classroom not found with ID: "+id));
        for(Student student: classRoom.getStudents()){
            student.getClassRooms().remove(classRoom);
            studentRepository.save(student);
        }
        classRoom.getStudents().clear();
        classRoomRepository.delete(classRoom);
    }


}
