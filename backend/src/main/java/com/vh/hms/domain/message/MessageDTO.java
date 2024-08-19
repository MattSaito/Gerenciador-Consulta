package com.vh.hms.domain.message;

import com.vh.hms.domain.patient.Patient;
import jakarta.validation.constraints.NotBlank;

public record MessageDTO(@NotBlank String sender, @NotBlank String email, @NotBlank String phone, @NotBlank String desc) {
    public MessageDTO (Message message) { this(message.getSender(), message.getEmail(), message.getPhone(), message.getDesc());}
}
