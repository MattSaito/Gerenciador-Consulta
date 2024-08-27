package com.vh.hms.auth;

import com.vh.hms.domain.doctor.DoctorRequestDTO;
import com.vh.hms.domain.user.User;
import com.vh.hms.domain.patient.PatientRequestDTO;
import com.vh.hms.services.DoctorService;
import com.vh.hms.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PatientService patientService;
    @Autowired
    DoctorService doctorService;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByLogin(username);
    }

    public void patientSignUp(PatientRequestDTO patientRequestDTO) {
        String encryptedPassword = new BCryptPasswordEncoder().encode(patientRequestDTO.password());
        User newUser = new User(patientRequestDTO.email(), encryptedPassword, "PATIENT");
        userRepository.save(newUser);
        patientService.create(patientRequestDTO);
    }

    public void doctorSignUp(DoctorRequestDTO doctorRequestDTO) {
        String encryptedPassword = new BCryptPasswordEncoder().encode(doctorRequestDTO.password());
        User newUser = new User(doctorRequestDTO.email(), encryptedPassword, "DOCTOR");
        userRepository.save(newUser);
        doctorService.create(doctorRequestDTO);
    }
}
