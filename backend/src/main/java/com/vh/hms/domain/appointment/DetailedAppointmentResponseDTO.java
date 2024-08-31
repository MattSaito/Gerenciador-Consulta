package com.vh.hms.domain.appointment;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public record DetailedAppointmentResponseDTO (@NotBlank UUID id, @NotNull @JsonFormat(pattern = "HH:mm") LocalTime time, @NotBlank @JsonFormat(pattern = "dd/MM/yyyy") LocalDate date, @NotNull AppointmentStatus status, @NotBlank
String firstName, @NotBlank String lastName, @NotNull String email, @NotNull String doctor, @NotNull String phone) {
    public DetailedAppointmentResponseDTO(Appointment appointment) {
        this(appointment.getAppointmentUUID(), appointment.getTime(), appointment.getDate(), appointment.getStatus(), appointment.getPatient().getFirstName(), appointment.getPatient().getLastName(), appointment.getPatient().getEmail(), appointment.getDoctor().getUsername(), appointment.getPatient().getPhone());
    }
}
