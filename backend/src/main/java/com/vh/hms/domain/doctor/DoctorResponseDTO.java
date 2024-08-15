package com.vh.hms.domain.doctor;

import java.math.BigDecimal;

public record DoctorResponseDTO(String username, String email, String specialization, BigDecimal docFees, String CRM) {
    public DoctorResponseDTO(Doctor doctor) {
        this(doctor.getUsername(), doctor.getEmail(), doctor.getSpecialization(), doctor.getDocFees(), doctor.getCRM());
    }
}
