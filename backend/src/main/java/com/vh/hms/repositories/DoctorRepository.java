package com.vh.hms.repositories;

import com.vh.hms.domain.doctor.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DoctorRepository extends JpaRepository<Doctor, UUID> {
    List<Doctor> findAllBySpecialization(String specialization);
    Optional<Doctor> findByEmail(String email);
    void deleteByEmail(String email);
}
