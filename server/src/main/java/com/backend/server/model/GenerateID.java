package com.backend.server.model;

import java.util.UUID;

public class GenerateID {
    public static String generateID() {
        return UUID.randomUUID().toString();
    }
}