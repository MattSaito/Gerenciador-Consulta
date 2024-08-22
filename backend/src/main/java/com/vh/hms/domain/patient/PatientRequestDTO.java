package com.vh.hms.domain.patient;

import jakarta.validation.constraints.NotBlank;

public record PatientRequestDTO(@NotBlank String firstName, @NotBlank String lastName, @NotBlank String email,
                @NotBlank String phone, @NotBlank String cpf, @NotBlank String password) {
}
