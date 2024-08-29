package com.vh.hms.services;


import com.vh.hms.domain.appointment.Appointment;
import com.vh.hms.domain.appointment.AppointmentRequestDTO;
import com.vh.hms.domain.appointment.AppointmentResponseDTO;
import com.vh.hms.domain.appointment.AppointmentStatus;
import com.vh.hms.domain.user.User;
import com.vh.hms.domain.user.UserRole;
import com.vh.hms.repositories.AppointmentRepository;
import com.vh.hms.services.exceptions.ResourceExistsException;
import com.vh.hms.services.exceptions.ResourceNotFoundException;
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
    @Autowired
    PatientService patientService;

    @Transactional(readOnly = true)
    public Page<AppointmentResponseDTO> findAll(Pageable pageable) {
        return appointmentRepository.findAll(pageable).map(AppointmentResponseDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<AppointmentResponseDTO> findAllByAuthenticated(Pageable pageable) {
        User user = authService.getAuthenticatedUser();
        if (user.getRole() == UserRole.PATIENT) return appointmentRepository.findAllByPatient_Email(user.getLogin(), pageable).map(AppointmentResponseDTO::new);
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
    public UUID create(AppointmentRequestDTO requestDTO) {
        if (isAvailable(requestDTO.time(), requestDTO.date(), requestDTO.doctor().getUsername())) throw new ResourceExistsException("Unavailable appointment");
        Appointment appointment = dtoToAppointment(requestDTO);
        appointmentRepository.save(appointment);
        return appointment.getAppointmentUUID();
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

    private Appointment notNullValidator(UUID id) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(id);
        return appointmentOptional.orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
    }

    private Appointment dtoToAppointment(AppointmentRequestDTO requestDTO) {
        Appointment appointment = new Appointment();
        BeanUtils.copyProperties(requestDTO, appointment);
        appointment.setStatus(AppointmentStatus.ACTIVE);
        String email = authService.getAuthenticatedUser().getLogin();
        appointment.setPatient(patientService.findPatientByEmail(email));
        return appointment;
    }
    private boolean isAvailable(Instant time, LocalDate date, String username) {
        return appointmentRepository.existsByDateAndTimeAndDoctor_Username(date, time, username);
    }


}
