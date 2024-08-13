package com.backend.server.DTO;

import com.backend.server.model.StudentTest;
import lombok.*;

import java.util.List;
import java.util.Map;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExamStatisticsDTO {
    private double average;
    private StudentTest topScorer;
    private List<Map<String, Object>> scoreDistribution;

}
