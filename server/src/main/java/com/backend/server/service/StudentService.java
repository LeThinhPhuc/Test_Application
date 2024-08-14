package com.backend.server.service;

import com.backend.server.DTO.StudentUpdateDTO;
import com.backend.server.model.Student;
import com.backend.server.model.StudentTest;
import com.backend.server.model.Test;
import com.backend.server.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    //- Helper
    private Student findStudentById(String id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll().stream().toList();
    }

    public Student getStudentById(String id) {
        return findStudentById(id);
    }



    @Transactional
    public Student updateStudent(String id, StudentUpdateDTO student) {
        Student studentDB = findStudentById(id);

        if (student.getName() != null) {
            studentDB.setName(student.getName());
        }
        if (student.getPhone() != null) {
            studentDB.setPhone(student.getPhone());
        }
        if (student.getGender() != null) {
            studentDB.setGender(student.getGender());
        }

        return studentRepository.save(studentDB);
    }

    public Student createStudent(Student student){
        return studentRepository.save(student);
    }

    //    @Transactional
//    public Student deleteStudent(String id) {
//        Student student = findStudentById(id);
//
//        //- Cart
//        cartService.deleteCart(String.valueOf(user.getId()));
//        user.setCart(null);
//
//        //- Authority
//        for(Authority authority : user.getAuthorities()) {
//            authority.getUsers().remove(user);
//        }
//        user.getAuthorities().clear();
//
//        //- Orders
//        for(Order order : user.getOrders()) {
//            orderService.deleteOrder(String.valueOf(order.getId()));
//        }
//        user.getOrders().clear();
//
//        userRepository.delete(user);
//        return userMapper.toUserResponseDTO(user);
//    }
}
