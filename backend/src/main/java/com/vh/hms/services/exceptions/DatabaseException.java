package com.vh.hms.services.exceptions;

import java.io.Serial;

public class DatabaseException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;
    public DatabaseException() {
        super("The account cannot be deleted because there are active appointments.");
    }
}