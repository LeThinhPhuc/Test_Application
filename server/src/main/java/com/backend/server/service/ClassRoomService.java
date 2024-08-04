package com.backend.server.service;

import com.backend.server.model.ClassRoom;
import com.backend.server.repository.IClassRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassRoomService {
    private final IClassRoomRepository classRoomRepository;

    @Autowired
    public ClassRoomService(IClassRoomRepository classRoomRepository){
        this.classRoomRepository = classRoomRepository;
    }

    public ClassRoom createClass(ClassRoom classRoom){
        return classRoomRepository.save(classRoom);
    }

    public ClassRoom getClassById(String id){
        return classRoomRepository.findById(id).orElseThrow(() -> new RuntimeException("Class not found with ID: " + id));
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
        classRoomRepository.deleteById(id);
    }


}
