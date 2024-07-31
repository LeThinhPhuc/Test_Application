package com.backend.server.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="test")
public class Test {
    @Id
    @Column(name="testid")
    private String testId;

    @Column(name="testname")
    private String testName;

    @Column(name="testtime")
    private Integer testTime;

    @Column(name="testday")
    @Temporal(TemporalType.DATE)
    private Date testDay;

    @Column(name = "timestart")
    @Temporal(TemporalType.TIME)
    private Date timeStart;

    @Column(name = "timeend")
    @Temporal(TemporalType.TIME)
    private Date endStart;

    public String getTestId() {
        return testId;
    }

    public void setTestId(String testId) {
        this.testId = testId;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public Integer getTestTime() {
        return testTime;
    }

    public void setTestTime(Integer testTime) {
        this.testTime = testTime;
    }

    public Date getTestDay() {
        return testDay;
    }

    public void setTestDay(Date testDay) {
        this.testDay = testDay;
    }

    public Date getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(Date timeStart) {
        this.timeStart = timeStart;
    }

    public Date getEndStart() {
        return endStart;
    }

    public void setEndStart(Date endStart) {
        this.endStart = endStart;
    }
}
