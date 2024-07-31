package com.backend.server.service;

import com.backend.server.repository.IClassRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClassRoomService {
    @Autowired
    private IClassRoomRepository classRoomRepository;
}
