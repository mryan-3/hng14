package com.hng14.stage0.dto;



/**
 * Represents the raw response from api.genderize.io
 */
public record GenderizeResponse(
    String name,
    String gender,
    Double probability,
    Integer count
) {}
