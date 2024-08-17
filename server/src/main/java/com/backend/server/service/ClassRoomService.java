package com.backend.server.service;

import com.backend.server.DTO.ClassRoomDTO;
import com.backend.server.DTO.RegistryDTO;
import com.backend.server.DTO.StudentDTO;
import com.backend.server.model.*;
import com.backend.server.repository.IClassRoomRepository;
import com.backend.server.repository.ITeacherRepository;
import com.backend.server.repository.StudentRepository;
import com.backend.server.repository.TestRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClassRoomService {
    private final IClassRoomRepository classRoomRepository;

    private final StudentRepository studentRepository;

    private final StudentService studentService;

    private final TeacherService teacherService;
    private final AccountService accountService;
    @Autowired
    public ClassRoomService(IClassRoomRepository classRoomRepository, StudentRepository studentRepository, StudentService studentService, TeacherService teacherService, AccountService accountService){
        this.classRoomRepository = classRoomRepository;
        this.studentRepository = studentRepository;
        this.studentService =  studentService;
        this.teacherService=teacherService;
        this.accountService=accountService;
    }

//    public ClassRoom createClass(ClassRoom classRoom){
//        classRoom.setClassRoomId(GenerateID.generateID());
//        return classRoomRepository.save(classRoom);
//    }

    public ClassRoom createClass(ClassRoomDTO classRoomDTO) {
        // Tạo lớp học mới từ DTO
        ClassRoom classRoom = new ClassRoom();
        classRoom.setClassRoomId(GenerateID.generateID());
        classRoom.setClassRoomName(classRoomDTO.getClassRoomName());
        classRoom.setSchoolYear(classRoomDTO.getSchoolYear());
        classRoom.setSemester(classRoomDTO.getSemester());
        classRoom.setTeacher(teacherService.getTeacherById(classRoomDTO.getTeacherId()));

        // Khởi tạo danh sách học sinh nếu null
        if (classRoom.getStudents() == null) {
            classRoom.setStudents(new ArrayList<>());  // Khởi tạo danh sách trống
        }

        // Lưu lớp học trước khi thêm học sinh
        classRoom = classRoomRepository.save(classRoom);

        // Thêm học sinh vào lớp học
        if (classRoomDTO.getStudents() != null && !classRoomDTO.getStudents().isEmpty()) {
            addStudentsToClass(classRoom.getClassRoomId(), classRoomDTO.getStudents());
        }

        return classRoom;
    }



    public ClassRoom getClassById(String id){
        return classRoomRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Class not found with ID: " + id));
    }

    public List<ClassRoom> getAllClass(){
        return classRoomRepository.findAll();
    }

    public List<Test> getTestsForClass(String classId){
        ClassRoom classRoom = getClassById(classId);
        return classRoom.getTests();
    }

    public List<Student> getStudentsForClass(String classId){
        ClassRoom classRoom = getClassById(classId);
        return classRoom.getStudents();
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
//        for(Student student: classRoom.getStudents()){
//            student.getClassRooms().remove(classRoom);
//            studentRepository.save(student);
//        }
//        classRoom.getStudents().clear();
        classRoomRepository.delete(classRoom);
    }


//    public ClassRoom addStudentToClass(String classId, Student studentData){
//        ClassRoom classRoom = classRoomRepository.findById(classId).orElseThrow(()->new RuntimeException("Class not found"));
////        Student student = studentService.createStudent(studentData);
////        classRoom.getStudents().add(student);
////        student.getClassRooms().add(classRoom);
//        Student studentFind = studentService.getStudentById(studentData.getId());
//        if(studentFind==null){
//            Student student = studentService.createStudent(studentData);
//
//            // Thêm học sinh vào lớp học nếu chưa có
//            if (!classRoom.getStudents().contains(student)) {
//                classRoom.getStudents().add(student);
//                student.getClassRooms().add(classRoom);
//            }
//        } else {
//            // Nếu học sinh đã tồn tại, kiểm tra xem đã có trong lớp học chưa
//            if (!classRoom.getStudents().contains(studentFind)) {
//                classRoom.getStudents().add(studentFind);
//                studentFind.getClassRooms().add(classRoom);
//            }
//        }
//        return classRoomRepository.save(classRoom);
//    }

    public ClassRoom addStudentToClass(String classId, StudentDTO studentDTO){
        ClassRoom classRoom = classRoomRepository.findById(classId).orElseThrow(()->new RuntimeException("Class not found"));
//        Student student = studentService.createStudent(studentData);
//        classRoom.getStudents().add(student);
//        student.getClassRooms().add(classRoom);
        Student studentFind = studentRepository.findById(studentDTO.getId()).orElse(null);

        if(studentFind==null){
            RegistryDTO registryDTO = new RegistryDTO(studentDTO.getId(),studentDTO.getId(),"123456", studentDTO.getName(),studentDTO.getPhone(),studentDTO.getGender());
            Account account = accountService.createUser(registryDTO, "student");
//            Student student = studentService.getStudentById(studentDTO.getId());

            // Thêm học sinh vào lớp học nếu chưa có
            if (!classRoom.getStudents().contains(account.getStudent())) {
                classRoom.getStudents().add(account.getStudent());
                account.getStudent().getClassRooms().add(classRoom);
            }
        } else {
            // Nếu học sinh đã tồn tại, kiểm tra xem đã có trong lớp học chưa
            if (!classRoom.getStudents().contains(studentFind)) {
                classRoom.getStudents().add(studentFind);
                studentFind.getClassRooms().add(classRoom);
            }
        }
        return classRoomRepository.save(classRoom);
    }

    public void addStudentsToClass(String classId, List<StudentDTO> students){
        for (StudentDTO student:students){
//            StudentDTO studentDTO = new StudentDTO(student.getId(), student.getName(), student.getPhone(), student.getGender());
            addStudentToClass(classId, student);
        }
    }
}
