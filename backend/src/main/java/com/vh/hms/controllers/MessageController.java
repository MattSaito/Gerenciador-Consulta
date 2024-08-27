package com.vh.hms.controllers;

import com.vh.hms.domain.message.MessageDTO;
import com.vh.hms.services.MessageService;
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
public class MessageController {
    @Autowired
    MessageService messageService;

    @GetMapping(value = "/messages")
    public ResponseEntity<Page<MessageDTO>> getAll(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "4") Integer linesPerPage, @RequestParam(defaultValue = "ASC") String direction, @RequestParam(defaultValue = "sender") String orderBy)
    {
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);
        return ResponseEntity.ok().body(messageService.findAllPaged(pageRequest));
    }

    @GetMapping(value = "/messages/{id}")
    public ResponseEntity<MessageDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok().body(messageService.findById(id));
    }
    @PostMapping(value = "/contact")
    public ResponseEntity<MessageDTO> create(@RequestBody @Valid MessageDTO messageDTO) {
        URI url = ServletUriComponentsBuilder.fromCurrentRequestUri().buildAndExpand(messageService.create(messageDTO)).toUri();
        return ResponseEntity.created(url).build();
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        messageService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
