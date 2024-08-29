package com.vh.hms.domain.appointment;

import com.vh.hms.domain.doctor.Doctor;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.time.LocalDate;

public record AppointmentRequestDTO(@NotNull Doctor doctor, @NotNull LocalDate date, @NotNull Instant time) {
}
