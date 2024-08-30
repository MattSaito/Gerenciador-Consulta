package com.vh.hms.services;

import com.vh.hms.domain.appointment.AppointmentStatus;
import com.vh.hms.domain.doctor.Doctor;
import com.vh.hms.domain.doctor.DoctorRequestDTO;
import com.vh.hms.domain.doctor.DoctorResponseDTO;
import com.vh.hms.repositories.DoctorRepository;
import com.vh.hms.services.exceptions.DatabaseException;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class DoctorService {
    @Autowired
    DoctorRepository doctorRepository;

    @Transactional(readOnly = true)
    public Page<DoctorResponseDTO> findAll(Pageable pageable) {
        return doctorRepository.findAll(pageable).map(DoctorResponseDTO::new);
    }

    @Transactional(readOnly = true)
    public DoctorResponseDTO findByEmail(String email) {
        Doctor doctor = notNullValidatorEmail(email);
        return new DoctorResponseDTO(doctor);
    }

    @Transactional(readOnly = true)
    public Doctor findByUsername(String username) {
        return notNullValidatorUsername(username);
    }

    @Transactional
    public DoctorResponseDTO update (DoctorRequestDTO doctorRequestDTO, String email) {
        Doctor doctor = notNullValidatorEmail(email);
        if (doctorRepository.existsByUsernameEquals(doctorRequestDTO.username())) throw new EntityExistsException(); // Exception
        BeanUtils.copyProperties(doctorRequestDTO, doctor);
        return new DoctorResponseDTO(doctorRepository.save(doctor));
    }

    @Transactional
    public String create(DoctorRequestDTO doctorRequestDTO) {
        Doctor doctor = new Doctor();
        if (doctorRepository.existsByUsernameEquals(doctorRequestDTO.username())) return ""; // Exception
        BeanUtils.copyProperties(doctorRequestDTO, doctor);
        return doctorRepository.save(doctor).getEmail();
    }

    @Transactional
    public void deleteByEmail(String email) {
        Doctor doctor = notNullValidatorEmail(email);
        if (doctor.getAppointments().stream().anyMatch(a -> a.getStatus() == AppointmentStatus.ACTIVE)) throw new DatabaseException(); // Database Exception
        doctorRepository.deleteByEmail(email);
    }


    private Doctor notNullValidatorEmail(String email) {
        Optional<Doctor> doctorOptional = doctorRepository.findByEmailEquals(email);
        return doctorOptional.orElseThrow(() -> new EntityNotFoundException("Doctor not found"));
    }

    private Doctor notNullValidatorUsername(String username) {
        Optional<Doctor> doctorOptional = doctorRepository.findByUsernameEquals(username);
        return doctorOptional.orElseThrow(() -> new EntityNotFoundException("Doctor not found"));
    }

    @Transactional
    public Page<DoctorResponseDTO> findAllBySpecialization(String specialization, Pageable pageable) {
        return doctorRepository.findAllBySpecialization(specialization, pageable).map(DoctorResponseDTO::new);
    }
}