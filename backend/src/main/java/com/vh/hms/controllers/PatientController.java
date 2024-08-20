package com.vh.hms.controllers;

import com.vh.hms.domain.patient.PatientRequestDTO;
import com.vh.hms.domain.patient.PatientResponseDTO;
import com.vh.hms.services.PatientService;
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
@RequestMapping("/patients")
public class PatientController {
    @Autowired
    PatientService patientService;

    @GetMapping
    public ResponseEntity<Page<PatientResponseDTO>> findAllPaged(@RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "4") Integer linesPerPage,
            @RequestParam(defaultValue = "ASC") String direction,
            @RequestParam(defaultValue = "firstName") String orderBy) {
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
        return ResponseEntity.ok().body(patientService.findAll(pageRequest));
    }

    @GetMapping(value = "/{email}")
    public ResponseEntity<PatientResponseDTO> findByEmail(@PathVariable String email) {
        return ResponseEntity.ok().body(patientService.findByEmail(email));
    }

    @PostMapping
    public ResponseEntity<PatientResponseDTO> create(@RequestBody @Valid PatientRequestDTO patientRequestDTO) {
        URI url = ServletUriComponentsBuilder.fromCurrentRequestUri()
                .buildAndExpand(patientService.create(patientRequestDTO)).toUri();
        return ResponseEntity.created(url).build();
    }

    @PutMapping(value = "/{email}")
    public ResponseEntity<PatientResponseDTO> update(@RequestBody @Valid PatientRequestDTO patientRequestDTO,
            @PathVariable String email) {
        return ResponseEntity.ok().body(patientService.update(patientRequestDTO, email));
    }

    @DeleteMapping(value = "/{email}")
    public ResponseEntity<Void> delete(@PathVariable String email) {
        patientService.deleteByEmail(email);
        return ResponseEntity.ok().build();
    }
}
