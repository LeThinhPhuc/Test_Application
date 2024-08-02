package com.backend.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Response {
    private Integer status;
    private String timestamp;
    private String message;

    public static Response of(HttpStatus status, String message) {
        Response response = new Response();
        response.setStatus(status.value());
        response.setTimestamp(String.valueOf(System.currentTimeMillis()));
        response.setMessage(message);
        return response;
    }

    public static String notFound(String name, String id) {
        return name + " not found with ID: " + id;
    }

    public static String badRequest(String name, String action) {
        return action + " " + name + " failed";
    }

    public static String delete(String name) {
        return "Deleted " + name + " successfully";
    }
}
