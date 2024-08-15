package com.vh.hms.repositories;

import com.vh.hms.domain.patient.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PatientRepository extends JpaRepository <Patient, UUID> {
}
