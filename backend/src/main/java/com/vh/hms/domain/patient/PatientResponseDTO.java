package com.vh.hms.domain.patient;

public record PatientResponseDTO(String firstName, String lastName, String email, String phone, String cpf) {
    public PatientResponseDTO(Patient patient) {
        this(patient.getFirstName(), patient.getFirstName(), patient.getEmail(), patient.getPhone(), patient.getCpf());
    }
}
