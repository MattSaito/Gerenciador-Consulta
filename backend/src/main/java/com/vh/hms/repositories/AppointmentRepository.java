package com.vh.hms.repositories;

import com.vh.hms.domain.appointment.Appointment;
import com.vh.hms.domain.appointment.AppointmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository <Appointment, UUID> {
    <S extends Appointment> Page<S> findAllByPatient_Email(String email, Pageable pageable);

    <S extends Appointment> Page<S> findAllByDoctor_Email(String email, Pageable pageable);
    boolean existsByDateAndTimeAndDoctor_Username(LocalDate date, LocalTime time, String username);
        List<Appointment> findAllByDateAfterAndTimeAfterAndStatusEquals(LocalDate date, Instant time, AppointmentStatus status);
}
