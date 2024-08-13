package com.backend.server.controller;

import com.backend.server.model.ClassRoom;
import com.backend.server.model.Response;
import com.backend.server.model.Teacher;
import com.backend.server.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
public class TeacherController {
    private final TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService){
        this.teacherService = teacherService;
    }

    @GetMapping
    public ResponseEntity<?> getAllTeachers(){
        try{
            List<Teacher> teachers = teacherService.getAllTeachers();
            if(teachers.size()==0){
                return ResponseEntity.ok("No Teacher yet !");
            }else{
                return ResponseEntity.ok(teachers);
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id){
        if(id==null){
            Response response = Response.of(HttpStatus.BAD_REQUEST,"ID is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try{
            Teacher teacher = teacherService.getTeacherById(id);
            if(teacher!=null){
                return ResponseEntity.ok(teacher);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Teacher not found");
            }

        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/getclassesforteacher/{teacherId}")
    public ResponseEntity<?> getClassesOfTeacher(@PathVariable String teacherId){
        try {
            Teacher teacher = teacherService.getTeacherById(teacherId);
            if(teacher!=null){
                List<ClassRoom> classRooms = teacherService.getAllClassForTeacher(teacherId);
                return ResponseEntity.ok(classRooms);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Teacher not found");
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping
    public ResponseEntity<?> createTeacher(@RequestBody Teacher teacher){
        if(teacher==null){
            Response response = Response.of(HttpStatus.BAD_REQUEST, "Teacher data is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try{
            teacherService.createTeacher(teacher);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

//    @PutMapping
//    public void updateTeacher(@RequestBody Teacher teacher){
//        teacherService.updateTeacher(teacher);
//    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTeacherById(@PathVariable String id,@RequestBody Teacher teacher){
        if(teacher==null||id==null){
            Response response = Response.of(HttpStatus.BAD_REQUEST, "ID and Classroom is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try{
            if(teacherService.getTeacherById(id)!=null){
                teacher.setTeacherId(id);
                Teacher updatedTeacher = teacherService.updateTeacher(id, teacher);
                return ResponseEntity.ok(updatedTeacher);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Teacher not found with ID: +id");
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTeacherById(@PathVariable String id){
        if(id==null){
            Response response = Response.of(HttpStatus.BAD_REQUEST, "ID is required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try{
            if(teacherService.getTeacherById(id)!=null){
                teacherService.deleteTeacherById(id);
                return ResponseEntity.ok("Teacher Deleted Success");
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Classroom not found with ID: "+id);
            }
        }catch (Exception ex){
            Response response = Response.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
