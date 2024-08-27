package com.vh.hms.domain.user;

public enum UserRole {
    PATIENT("patient"),
    DOCTOR("doctor"),
    ADMIN("admin");

    private final String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
