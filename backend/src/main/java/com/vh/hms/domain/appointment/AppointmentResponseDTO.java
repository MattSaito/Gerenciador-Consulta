package com.vh.hms.domain.appointment;

import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.time.LocalDate;

public record AppointmentResponseDTO (@NotNull Instant time, @NotNull LocalDate date, @NotNull AppointmentStatus status) {
    public AppointmentResponseDTO (Appointment appointment) {
        this(appointment.getTime(), appointment.getDate(), appointment.getStatus());
    }
}
