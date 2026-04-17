package com.hng14.stage1.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Standardized error response for all API failures.
 * Using a record for conciseness, similar to Stage 0.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ErrorResponse(
    String status,
    String message
) {
    public static ErrorResponse of(String message) {
        return new ErrorResponse("error", message);
    }

    public static ErrorResponse gatewayError(String message) {
        return new ErrorResponse("502", message);
    }
}
