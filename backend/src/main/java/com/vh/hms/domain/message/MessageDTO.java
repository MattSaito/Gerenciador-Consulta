package com.vh.hms.domain.message;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record MessageDTO(UUID id, @NotBlank String sender, @NotBlank String email, @NotBlank String phone, @NotBlank String description) {
    public MessageDTO (Message message) { this(message.getMessageUUID(), message.getSender(), message.getEmail(), message.getPhone(), message.getDescription());}
}
