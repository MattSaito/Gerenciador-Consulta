package com.vh.hms.domain.appointment;

import com.vh.hms.domain.doctor.Doctor;
import com.vh.hms.domain.patient.Patient;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentResponseDTO (@NotNull LocalTime time, @NotNull LocalDate date, @NotNull AppointmentStatus status, @NotNull
                                      Patient patient, @NotNull Doctor doctor) {
    public AppointmentResponseDTO (Appointment appointment) {
        this(appointment.getTime(), appointment.getDate(), appointment.getStatus(), appointment.getPatient(), appointment.getDoctor());
    }
}
