package com.backend.server.model;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.util.Objects;
import java.util.UUID;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class StudentTestId {
    private String studentId;
    private String testId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StudentTestId that)) return false;
        return Objects.equals(getStudentId(), that.getStudentId()) && Objects.equals(getTestId(), that.getTestId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getStudentId(), getTestId());
    }
}
