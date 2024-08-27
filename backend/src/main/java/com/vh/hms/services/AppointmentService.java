package com.vh.hms.services;


import com.vh.hms.auth.AuthService;
import com.vh.hms.domain.appointment.Appointment;
import com.vh.hms.domain.appointment.AppointmentRequestDTO;
import com.vh.hms.domain.appointment.AppointmentResponseDTO;
import com.vh.hms.domain.appointment.AppointmentStatus;
import com.vh.hms.domain.user.User;
import com.vh.hms.domain.user.UserRole;
import com.vh.hms.repositories.AppointmentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AppointmentService {
    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    AuthService authService;
    @Autowired
    DoctorService doctorService;

    @Transactional(readOnly = true)
    public Page<AppointmentResponseDTO> findAll(Pageable pageable) {
        return appointmentRepository.findAll(pageable).map(AppointmentResponseDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<AppointmentResponseDTO> findAllByAuthenticated(Pageable pageable) {
        User user = authService.getAuthenticatedUser();
        if (user.getRole() == UserRole.PATIENT)
            return appointmentRepository.findAllByPatient_Email(user.getLogin(), pageable).map(AppointmentResponseDTO::new);
        return appointmentRepository.findAllByDoctor_Email(user.getLogin(), pageable).map(AppointmentResponseDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<AppointmentResponseDTO> findAllByPatient(Pageable pageable, String login) {
        return appointmentRepository.findAllByPatient_Email(login, pageable).map(AppointmentResponseDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<AppointmentResponseDTO> findAllByDoctor(Pageable pageable, String login) {
        return appointmentRepository.findAllByPatient_Email(login, pageable).map(AppointmentResponseDTO::new);
    }

    @Transactional
    public void create(AppointmentRequestDTO requestDTO) {
        if (isDisponible(requestDTO.time(), requestDTO.date(), requestDTO.doctor())) return; // Exception
        Appointment appointment = new Appointment();
        BeanUtils.copyProperties(requestDTO, appointment);
        appointment.setStatus(AppointmentStatus.ACTIVE);
        appointmentRepository.save(appointment);
    }

    public void finish() {
        List<Appointment> appointments = appointmentRepository.findAllByDateAfterAndTimeAfterAndStatusEquals(LocalDate.now(), Instant.now(), AppointmentStatus.ACTIVE);
        appointments.forEach(a -> a.setStatus(AppointmentStatus.FINISHED));
        appointmentRepository.saveAll(appointments);
    }

    @Transactional
    public void cancel(UUID uuid) {
        Appointment appointment = notNullValidator(uuid);
        User user = authService.getAuthenticatedUser();
        if (appointment.getStatus() != AppointmentStatus.ACTIVE) {
            if (user.getRole() == UserRole.PATIENT) appointment.setStatus(AppointmentStatus.CANCELLED_BY_PATIENT);
            else appointment.setStatus((AppointmentStatus.CANCELLED_BY_DOCTOR));
            appointmentRepository.save(appointment);
        }
    }

    @Transactional(readOnly = true)
    public AppointmentResponseDTO findById(UUID id) {
        Appointment appointment = notNullValidator(id);
        return new AppointmentResponseDTO(appointment);
    }

    private Appointment notNullValidator(UUID id) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(id);
        return appointmentOptional.orElseThrow(() -> new EntityNotFoundException("Appointment not found"));
    }

    private boolean isDisponible(Instant time, LocalDate date, String username) {
        return appointmentRepository.existsByDateAndTimeAndDoctor_Username(date, time, username);
    }
}
