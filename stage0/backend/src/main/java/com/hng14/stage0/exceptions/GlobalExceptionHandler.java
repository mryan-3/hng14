package com.hng14.stage0.exceptions;

import com.hng14.stage0.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

/**
 * Global Exception Handler to ensure consistent error JSON format.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles explicit validation errors (like 400 Bad Request).
     */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> handleResponseStatus(ResponseStatusException ex) {
        return ResponseEntity.status(ex.getStatusCode())
                .body(ErrorResponse.of(ex.getReason()));
    }

    /**
     * Handles type mismatch errors (like 422 Unprocessable Entity).
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.status(422)
                .body(ErrorResponse.of("Invalid input type: " + ex.getName() + " must be a valid string"));
    }

    /**
     * Handles business logic errors from the service.
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntime(RuntimeException ex) {
        // If it's the "No prediction" error, return 400 as per task rules
        if (ex.getMessage().contains("No prediction available")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ErrorResponse.of(ex.getMessage()));
        }
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of("Internal server error: " + ex.getMessage()));
    }

    /**
     * Final fallback for any unhandled exceptions.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAll(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of("An unexpected error occurred: " + ex.getMessage()));
    }
}
