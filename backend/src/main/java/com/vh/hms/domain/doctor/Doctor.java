package com.vh.hms.domain.doctor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

@Entity
public class Doctor implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID doctorUUID;
    private String username;
    private String password;
    private String email;
    private String specialization;
    private String CRM;
    private BigDecimal docFees;

    public Doctor() {}

    public Doctor(UUID doctorUUID, String username, String password, String email, String specialization, String CRM, BigDecimal docFees) {
        this.doctorUUID = doctorUUID;
        this.username = username;
        this.password = password;
        this.email = email;
        this.specialization = specialization;
        this.CRM = CRM;
        this.docFees = docFees;
    }

    public UUID getDoctorUUID() {
        return doctorUUID;
    }

    public void setDoctorUUID(UUID doctorUUID) {
        this.doctorUUID = doctorUUID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getCRM() {
        return CRM;
    }

    public void setCRM(String CRM) {
        this.CRM = CRM;
    }

    public BigDecimal getDocFees() {
        return docFees;
    }

    public void setDocFees(BigDecimal docFees) {
        this.docFees = docFees;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Doctor doctor = (Doctor) o;
        return Objects.equals(doctorUUID, doctor.doctorUUID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(doctorUUID);
    }
}
