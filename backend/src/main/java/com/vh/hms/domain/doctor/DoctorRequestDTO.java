package com.vh.hms.domain.doctor;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

    public record DoctorRequestDTO(@NotBlank String username, @NotBlank String email, @NotBlank String specialization, @NotBlank String password, @NotNull String CRM, @NotNull BigDecimal docFees) {
}
