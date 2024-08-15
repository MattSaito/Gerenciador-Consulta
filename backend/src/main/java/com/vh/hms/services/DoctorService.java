package com.vh.hms.services;

import com.vh.hms.domain.doctor.Doctor;
import com.vh.hms.domain.doctor.DoctorRequestDTO;
import com.vh.hms.domain.doctor.DoctorResponseDTO;
import com.vh.hms.repositories.DoctorRepository;
import jakarta.persistence.EntityNotFoundException;
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

    public DoctorResponseDTO update (DoctorRequestDTO doctorRequestDTO, String email) {
        Doctor doctor = notNullValidator(email);
        dtoToDoctor(doctor, doctorRequestDTO);
        return new DoctorResponseDTO(doctorRepository.save(doctor));
    }

    public void create(DoctorRequestDTO doctorRequestDTO) {
        Doctor doctor = new Doctor();
        dtoToDoctor(doctor, doctorRequestDTO);
        doctorRepository.save(doctor);
    }

    public void deleteByEmail(String email) {
        doctorRepository.deleteByEmail(email);
    }

    private Doctor notNullValidator(String email) {
        Optional<Doctor> doctorOptional = doctorRepository.findByEmail(email);
        return doctorOptional.orElseThrow(() -> new EntityNotFoundException("Doctor not found"));
    }

    private void dtoToDoctor(Doctor doctor, DoctorRequestDTO doctorRequestDTO) {
        doctor.setUsername(doctorRequestDTO.username());
        doctor.setPassword(doctorRequestDTO.password());
        doctor.setDocFees(doctorRequestDTO.docFees());
        doctor.setEmail(doctorRequestDTO.email());
        doctor.setSpecialization(doctor.getSpecialization());
    }
}
