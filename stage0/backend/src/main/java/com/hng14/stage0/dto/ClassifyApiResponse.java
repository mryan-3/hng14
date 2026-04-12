package com.hng14.stage0.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The top-level wrapper for successful API responses.
 */
public record ClassifyApiResponse(
    String status,
    ClassifyData data
) {
    /**
     * Inner data object containing the processed gender information.
     */
    public record ClassifyData(
        String name,
        String gender,
        Double probability,
        @JsonProperty("sample_size") Integer sampleSize,
        @JsonProperty("is_confident") Boolean isConfident,
        @JsonProperty("processed_at") String processedAt
    ) {}
}
