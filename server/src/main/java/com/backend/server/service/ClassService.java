package com.backend.server.service;

import com.backend.server.repository.IClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClassService {
    @Autowired
    private IClassRepository classRepository;
}
