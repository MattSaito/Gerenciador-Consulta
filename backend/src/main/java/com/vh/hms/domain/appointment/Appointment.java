package com.vh.hms.domain.appointment;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

@Entity
public class Appointment implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID appointmentUUID;
    private Instant time;
    private LocalDate date;
    private AppointmentStatus status;

    public Appointment () {}

    public Appointment(UUID appointmentUUID, Instant time, LocalDate date, AppointmentStatus status) {
        this.appointmentUUID = appointmentUUID;
        this.time = time;
        this.date = date;
        this.status = status;
    }

    public UUID getAppointmentUUID() {
        return appointmentUUID;
    }

    public void setAppointmentUUID(UUID appointmentUUID) {
        this.appointmentUUID = appointmentUUID;
    }

    public Instant getTime() {
        return time;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Appointment that = (Appointment) o;
        return Objects.equals(appointmentUUID, that.appointmentUUID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(appointmentUUID);
    }
}
