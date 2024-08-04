package com.backend.server.controller;

import com.backend.server.model.ClassRoom;
import com.backend.server.model.Response;
import com.backend.server.service.ClassRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
public class ClassRoomController {
    private final ClassRoomService classRoomService;

    @Autowired
    public ClassRoomController(ClassRoomService classRoomService){
        this.classRoomService = classRoomService;
    }

    @GetMapping
    public ResponseEntity<?> getAllClassRooms(){
        try{
            List<ClassRoom> classRooms = classRoomService.getAllClass();
            if(classRooms.size() == 0){
                return ResponseEntity.ok("No Classroom yet !");
            }else{
                return ResponseEntity.ok(classRooms);
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while retrieving classroom");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClassById(@PathVariable String id){
        if(id==null){
            Response response = Response.of(HttpStatus.BAD_REQUEST, "ID is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try{
            ClassRoom classRoom = classRoomService.getClassById(id);
            if(classRoom != null){
                return ResponseEntity.ok(classRoom);
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Classroom not found");
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping
    public ResponseEntity<?> createClassRoom(@RequestBody ClassRoom classRoom){
        if(classRoom==null){
            Response response = Response.of(HttpStatus.BAD_REQUEST, "Classroom is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try{
            classRoomService.createClass(classRoom);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClassRoom(@PathVariable String id, @RequestBody ClassRoom classRoom){
        if(classRoom==null||id==null){
            Response response = Response.of(HttpStatus.BAD_REQUEST, "ID and Classroom is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try {
            if(classRoomService.getClassById(id)!=null){
                classRoom.setClassRoomId(id);
                ClassRoom updatedClass =  classRoomService.updateClass(id, classRoom);
                return ResponseEntity.ok(updatedClass);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Classroom not found with ID: "+id);
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClassRoom(@PathVariable String id){
        if(id==null){
            Response response = Response.of(HttpStatus.BAD_REQUEST, "ID is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try{
            if(classRoomService.getClassById(id)!=null){
                classRoomService.deleteClass(id);
                return ResponseEntity.ok("Deleted Success");
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Classroom not found with ID: "+id);
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}