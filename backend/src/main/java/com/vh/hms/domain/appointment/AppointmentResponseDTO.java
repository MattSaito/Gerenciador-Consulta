package com.vh.hms.domain.appointment;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.vh.hms.domain.doctor.Doctor;
import com.vh.hms.domain.patient.Patient;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public record AppointmentResponseDTO (@NotNull UUID id, @NotNull @JsonFormat(pattern = "HH:mm") LocalTime time, @NotNull @JsonFormat(pattern = "dd/MM/yyyy") LocalDate  date, @NotNull AppointmentStatus status, @NotNull
                                      String patient, @NotNull String doctor) {
    public AppointmentResponseDTO (Appointment appointment) {
        this(appointment.getAppointmentUUID(), appointment.getTime(), appointment.getDate(), appointment.getStatus(), appointment.getPatient().getFirstName(), appointment.getDoctor().getUsername());
    }
}
