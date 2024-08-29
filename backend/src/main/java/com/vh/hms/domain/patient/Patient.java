package com.vh.hms.domain.patient;

import com.vh.hms.domain.appointment.Appointment;
import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
public class Patient implements Serializable {
    @Serial
    private final static long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID patientUUID;
    private String firstName;
    private String lastName;
    private String phone;
    private String cpf;
    private String email;
    private String password;
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Appointment> appointments = new HashSet<>();

    public Patient(UUID uuid, String firstName, String lastName, String phone, String cpf) {
        this.patientUUID = uuid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.cpf = cpf;
    }
    public Patient() {}


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UUID getPatientUUID() {
        return patientUUID;
    }

    public void setPatientUUID(UUID patientUUID) {
        this.patientUUID = patientUUID;
    }

    public Set<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(Appointment appointment) {
        appointments.add(appointment);
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Patient patient = (Patient) o;
        return Objects.equals(patientUUID, patient.patientUUID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(patientUUID);
    }
}
