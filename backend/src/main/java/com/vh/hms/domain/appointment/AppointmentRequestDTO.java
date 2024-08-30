package com.vh.hms.domain.appointment;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.vh.hms.domain.doctor.Doctor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentRequestDTO(@NotBlank String doctor,
                                    @NotNull @JsonFormat(pattern = "dd/MM/yyyy") LocalDate date,
                                    @NotNull @JsonFormat(pattern = "HH:mm") LocalTime time) {
}
