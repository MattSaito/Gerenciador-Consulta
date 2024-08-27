package com.vh.hms.domain.appointment;

import java.time.Instant;
import java.time.LocalDate;

public record AppointmentRequestDTO(String doctor, LocalDate date, Instant time) {
}
