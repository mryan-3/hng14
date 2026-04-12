package com.hng14.stage0.controllers;

import com.hng14.stage0.dto.ClassifyApiResponse;
import com.hng14.stage0.services.ClassifyService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * REST Controller for the name classification API.
 */
@RestController
@RequestMapping("/api")
public class ClassifyController {

    private final ClassifyService classifyService;

    public ClassifyController(ClassifyService classifyService) {
        this.classifyService = classifyService;
    }

    /**
     * GET /api/classify?name=Alex
     * Validates inputs and returns classification data.
     */
    @GetMapping("/classify")
    public ClassifyApiResponse classify(@RequestParam(required = false) String name) {
        // Validation: Missing or empty name returns 400 Bad Request
        if (name == null || name.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name parameter is required and cannot be empty");
        }

        return classifyService.classifyName(name);
    }
}
