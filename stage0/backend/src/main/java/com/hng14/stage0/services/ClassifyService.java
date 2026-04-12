package com.hng14.stage0.services;

import com.hng14.stage0.dto.ClassifyApiResponse;
import com.hng14.stage0.dto.GenderizeResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Service to handle external Genderize API calls and data processing logic.
 */
@Service
public class ClassifyService {

    private final RestClient restClient;

    /**
     * Constructor injection for RestClient.
     */
    public ClassifyService(RestClient restClient) {
        this.restClient = restClient;
    }

    /**
     * Calls Genderize API and processes the data according to business rules.
     */
    public ClassifyApiResponse classifyName(String name) {
        // External API Call
        GenderizeResponse raw = restClient.get()
                .uri("/?name={name}", name)
                .retrieve()
                .body(GenderizeResponse.class);

        // Logic: Check for no prediction
        if (raw == null || raw.gender() == null || raw.count() == 0) {
            throw new RuntimeException("No prediction available for the provided name");
        }

        // Logic: Compute confidence
        // Rule: true when probability >= 0.7 AND sample_size >= 100
        boolean isConfident = raw.probability() >= 0.7 && raw.count() >= 100;

        // Logic: Generate processed_at (UTC, ISO 8601)
        String processedAt = ZonedDateTime.now(ZoneOffset.UTC)
                .format(DateTimeFormatter.ISO_INSTANT);

        // Mapping to final DTO
        ClassifyApiResponse.ClassifyData data = new ClassifyApiResponse.ClassifyData(
                raw.name(),
                raw.gender(),
                raw.probability(),
                raw.count(),
                isConfident,
                processedAt
        );

        return new ClassifyApiResponse("success", data);
    }
}
