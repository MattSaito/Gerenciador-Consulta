package com.vh.hms.services.exceptions;

import java.io.Serial;
import java.io.Serializable;

public class ResourceExistsException extends RuntimeException implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    public ResourceExistsException() {
        super("This account already exists.");
    }

    public ResourceExistsException(String message) {
        super(message);
    }
}
