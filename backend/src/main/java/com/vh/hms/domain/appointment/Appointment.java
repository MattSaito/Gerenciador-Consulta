package com.vh.hms.domain.appointment;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.vh.hms.domain.doctor.Doctor;
import com.vh.hms.domain.patient.Patient;
import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;
import java.util.UUID;

@Entity
public class Appointment implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID appointmentUUID;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime time;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate date;
    private AppointmentStatus status;
    @ManyToOne
    private Doctor doctor;
    @ManyToOne
    private Patient patient;
    public Appointment() {
    }

    public Appointment(UUID appointmentUUID, LocalTime time, LocalDate date, AppointmentStatus status) {
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

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
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

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
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
