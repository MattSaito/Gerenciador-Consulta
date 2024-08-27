package com.vh.hms.services;


import com.vh.hms.domain.patient.Patient;
import com.vh.hms.domain.patient.PatientRequestDTO;
import com.vh.hms.domain.patient.PatientResponseDTO;
import com.vh.hms.repositories.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    PatientRepository patientRepository;

    @Transactional(readOnly = true)
    public Page<PatientResponseDTO> findAll(Pageable pageable) {
        return patientRepository.findAll(pageable).map(PatientResponseDTO::new);
    }

    @Transactional(readOnly = true)
    public PatientResponseDTO findByEmail(String email) {
        Patient patient = notNullValidator(email);
        return new PatientResponseDTO(patient);
    }

    @Transactional
    public PatientResponseDTO update (PatientRequestDTO patientRequestDTO, String email) {
        Patient patient = notNullValidator(email);
        BeanUtils.copyProperties(patient, patientRequestDTO);
        return new PatientResponseDTO(patientRepository.save(patient));
    }
    @Transactional
    public String create(PatientRequestDTO patientRequestDTO) {
        Patient patient = new Patient();
        BeanUtils.copyProperties(patient, patientRequestDTO);
        return patientRepository.save(patient).getEmail();
    }
    @Transactional
    public void deleteByEmail(String email) {
        patientRepository.deleteByEmail(email);
    }

    private Patient notNullValidator(String email) {
        Optional<Patient> patientOptional = patientRepository.findByEmail(email);
        return patientOptional.orElseThrow(() -> new EntityNotFoundException("Patient not found"));
    }
}
