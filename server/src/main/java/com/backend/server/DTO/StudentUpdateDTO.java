package com.backend.server.DTO;


import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StudentUpdateDTO {
    private String name;

    private String phone;

    private String gender;
}
