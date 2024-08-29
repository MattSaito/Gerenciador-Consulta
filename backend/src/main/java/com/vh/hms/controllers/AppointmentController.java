package com.vh.hms.controllers;

import com.vh.hms.domain.appointment.AppointmentRequestDTO;
import com.vh.hms.domain.appointment.AppointmentResponseDTO;
import com.vh.hms.services.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping(value = "/appointments")
public class AppointmentController {
    @Autowired
    AppointmentService service;

    @GetMapping
    public ResponseEntity<Page<AppointmentResponseDTO>> getAll (@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "4") Integer linesPerPage, @RequestParam(defaultValue = "ASC") String direction, @RequestParam(defaultValue = "date") String orderBy) {
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
        return ResponseEntity.ok().body(service.findAll(pageRequest));
    }

    @GetMapping("/my")
    public ResponseEntity<Page<AppointmentResponseDTO>> getAllForAuthenticatedUser(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "4") Integer linesPerPage, @RequestParam(defaultValue = "ASC") String direction, @RequestParam(defaultValue = "date") String orderBy)
 {
     PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
     return ResponseEntity.ok().body(service.findAllByAuthenticated(pageRequest));
    }

    @GetMapping("/doctor/{doctor}")
    public ResponseEntity<Page<AppointmentResponseDTO>> getAllFromDoctor(@PathVariable String doctor, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "4") Integer linesPerPage, @RequestParam(defaultValue = "ASC") String direction, @RequestParam(defaultValue = "date") String orderBy)
    {
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
        return ResponseEntity.ok().body(service.findAllByDoctor(pageRequest, doctor));
    }

    @GetMapping("/patient/{patient}")
    public ResponseEntity<Page<AppointmentResponseDTO>> getAllFromPatient(@PathVariable String patient, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "4") Integer linesPerPage, @RequestParam(defaultValue = "ASC") String direction, @RequestParam(defaultValue = "date") String orderBy)
    {
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
        return ResponseEntity.ok().body(service.findAllByPatient(pageRequest, patient));
    }

    @PostMapping("/booking")
    public ResponseEntity<Void> booking(@RequestBody @Valid AppointmentRequestDTO request) {
        URI url = ServletUriComponentsBuilder.fromCurrentRequestUri().buildAndExpand(service.create(request)).toUri();
        return ResponseEntity.created(url).build();
    }

    @PatchMapping("/cancel/{id}")
    public ResponseEntity<Void> cancel(@PathVariable UUID id) {
        service.cancel(id);
        return ResponseEntity.ok().build();
    }
    @PatchMapping("/finish")
    public ResponseEntity<Void> finish() {
        service.finish();
        return ResponseEntity.ok().build();
    }
}
