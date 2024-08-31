package com.vh.hms.repositories;

import com.vh.hms.domain.appointment.Appointment;
import com.vh.hms.domain.appointment.AppointmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository <Appointment, UUID> {
    <S extends Appointment> Page<S> findAllByPatient_Email(String email, Pageable pageable);

    <S extends Appointment> Page<S> findAllByDoctor_Email(String email, Pageable pageable);

    boolean existsByDateAndTimeAndDoctor_Username(LocalDate date, LocalTime time, String username);

    @Query("SELECT a FROM Appointment a WHERE a.status = :status AND " +
            "(a.date < :currentDate OR (a.date = :currentDate AND a.time < :currentTime))")
    List<Appointment> findByStatusAndDateTimeBefore(
            @Param("status") AppointmentStatus status,
            @Param("currentDate") LocalDate currentDate,
            @Param("currentTime") LocalTime currentTime
    );}