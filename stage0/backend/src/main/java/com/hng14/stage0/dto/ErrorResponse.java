package com.hng14.stage0.dto;

/**
 * Standardized error response for all API failures.
 */
public record ErrorResponse(
    String status,
    String message
) {
    /**
     * Factory method for creating an error response quickly.
     */
    public static ErrorResponse of(String message) {
        return new ErrorResponse("error", message);
    }
}
