package com.vh.hms.services;

import com.vh.hms.domain.doctor.Doctor;
import com.vh.hms.domain.doctor.DoctorRequestDTO;
import com.vh.hms.domain.doctor.DoctorResponseDTO;
import com.vh.hms.domain.patient.Patient;
import com.vh.hms.domain.patient.PatientRequestDTO;
import com.vh.hms.domain.patient.PatientResponseDTO;
import com.vh.hms.repositories.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
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
    public PatientResponseDTO update(PatientRequestDTO patientRequestDTO, String email) {
        Patient patient = notNullValidator(email);
        dtoToPatient(patient, patientRequestDTO);
        return new PatientResponseDTO(patientRepository.save(patient));
    }

    @Transactional
    public String create(PatientRequestDTO patientRequestDTO) {
        Patient patient = new Patient();
        dtoToPatient(patient, patientRequestDTO);
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

    private void dtoToPatient(Patient patient, PatientRequestDTO patientRequestDTO) {
        patient.setCpf(patientRequestDTO.cpf());
        patient.setEmail(patientRequestDTO.email());
        patient.setFirstName(patientRequestDTO.firstName());
        patient.setLastName(patientRequestDTO.lastName());
        patient.setPassword(patientRequestDTO.password());
        patient.setPhone(patientRequestDTO.phone());
    }
}
