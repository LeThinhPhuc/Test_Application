package com.backend.server.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegistryDTO {
    private String id;
    private String username;
    private String password;
    private String name;
    private String phone;
    private String gender;
}
