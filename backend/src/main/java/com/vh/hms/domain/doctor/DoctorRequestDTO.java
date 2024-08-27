package com.vh.hms.domain.doctor;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

    public record DoctorRequestDTO(@NotBlank String username, @NotBlank String email, @NotBlank String specialization, @NotNull String password) {
}
