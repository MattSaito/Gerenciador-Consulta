package com.vh.hms.repositories;

import com.vh.hms.domain.appointment.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AppointmentRepository extends JpaRepository <Appointment, UUID> {
}
