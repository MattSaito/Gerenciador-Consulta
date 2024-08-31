package com.vh.hms.controllers;

import com.vh.hms.services.AuthService;
import com.vh.hms.domain.doctor.DoctorRequestDTO;
import com.vh.hms.domain.doctor.DoctorResponseDTO;
import com.vh.hms.services.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/doctors")
public class DoctorController {
    @Autowired
    DoctorService doctorService;
    @Autowired
    AuthService authService;
    @GetMapping
    public ResponseEntity<Page<DoctorResponseDTO>> findAllPaged(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "4") Integer linesPerPage, @RequestParam(defaultValue = "ASC") String direction, @RequestParam(defaultValue = "username") String orderBy) {
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
        return ResponseEntity.ok().body(doctorService.findAll(pageRequest));
    }

    @GetMapping(value = "/list/{specialization}")
    public ResponseEntity<Page<DoctorResponseDTO>> findAllPaged(@PathVariable String specialization, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "4") Integer linesPerPage, @RequestParam(defaultValue = "ASC") String direction, @RequestParam(defaultValue = "username") String orderBy) {
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
        return ResponseEntity.ok().body(doctorService.findAllBySpecialization(specialization, pageRequest));
    }

    @GetMapping(value = "/{email}")
    public ResponseEntity<DoctorResponseDTO> findByEmail(@PathVariable String email) {
        return ResponseEntity.ok().body(doctorService.findByEmail(email));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<DoctorResponseDTO> create (@RequestBody @Valid DoctorRequestDTO doctorRequestDTO) {
        if (authService.loadUserByUsername(doctorRequestDTO.email()) != null) return ResponseEntity.badRequest().build();
        authService.doctorSignUp(doctorRequestDTO);
        URI url = ServletUriComponentsBuilder.fromCurrentRequestUri().build().toUri();
        return ResponseEntity.created(url).build();
    }

    @PutMapping(value = "/{email}")
    public ResponseEntity<DoctorResponseDTO> update (@RequestBody @Valid DoctorRequestDTO doctorRequestDTO, @PathVariable String email) {
        return ResponseEntity.ok().body(doctorService.update(doctorRequestDTO, email));
    }

    @DeleteMapping(value = "/{email}")
    public ResponseEntity<Void> delete (@PathVariable String email) {
        doctorService.deleteByEmail(email);
        return ResponseEntity.ok().build();
    }
}
