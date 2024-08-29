package com.vh.hms.services;


import com.vh.hms.domain.appointment.AppointmentStatus;
import com.vh.hms.domain.patient.Patient;
import com.vh.hms.domain.patient.PatientRequestDTO;
import com.vh.hms.domain.patient.PatientResponseDTO;
import com.vh.hms.repositories.PatientRepository;
import com.vh.hms.services.exceptions.DatabaseException;
import com.vh.hms.services.exceptions.ResourceNotFoundException;
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

    @Transactional(readOnly = true)
    public Patient findPatientByEmail(String email) {
        return notNullValidator(email);
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
        Patient patient = notNullValidator(email);
        if (patient.getAppointments().stream().anyMatch(a -> a.getStatus() == AppointmentStatus.ACTIVE)) throw new DatabaseException();
        patientRepository.deleteByEmail(email);
    }
    private Patient notNullValidator(String email) {
        Optional<Patient> patientOptional = patientRepository.findByEmail(email);
        return patientOptional.orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
    }
}
