package com.vh.hms.services;

import com.vh.hms.domain.doctor.Doctor;
import com.vh.hms.domain.doctor.DoctorRequestDTO;
import com.vh.hms.domain.doctor.DoctorResponseDTO;
import com.vh.hms.repositories.DoctorRepository;
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
        Doctor doctor = notNullValidator(email);
        return new DoctorResponseDTO(doctor);
    }

    @Transactional
    public DoctorResponseDTO update (DoctorRequestDTO doctorRequestDTO, String email) {
        Doctor doctor = notNullValidator(email);
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
        doctorRepository.deleteByEmail(email);
    }

    private Doctor notNullValidator(String email) {
        Optional<Doctor> doctorOptional = doctorRepository.findByEmailEquals(email);
        return doctorOptional.orElseThrow(() -> new EntityNotFoundException("Doctor not found"));
    }

    @Transactional
    public Page<DoctorResponseDTO> findAllBySpecialization(String specialization, Pageable pageable) {
        return doctorRepository.findAllBySpecialization(specialization, pageable).map(DoctorResponseDTO::new);
    }
}