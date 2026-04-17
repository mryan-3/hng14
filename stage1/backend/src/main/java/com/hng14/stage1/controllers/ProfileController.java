package com.hng14.stage1.controllers;

import com.hng14.stage1.dto.ApiResponse;
import com.hng14.stage1.dto.ErrorResponse;
import com.hng14.stage1.entities.Profile;
import com.hng14.stage1.services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @PostMapping
    public ResponseEntity<Object> createProfile(@RequestBody Map<String, Object> payload) {
        Object nameObj = payload.get("name");
        if (nameObj == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ErrorResponse.of("Missing or empty name"));
        }
        if (!(nameObj instanceof String)) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body(ErrorResponse.of("Invalid type"));
        }

        ApiResponse<Profile> response = profileService.createProfile((String) nameObj);
        HttpStatus status = response.getMessage() != null && response.getMessage().contains("already exists") 
                ? HttpStatus.OK 
                : HttpStatus.CREATED;
        
        return ResponseEntity.status(status).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Profile>> getProfile(@PathVariable UUID id) {
        return ResponseEntity.ok(profileService.getProfile(id));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> listProfiles(
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String country_id,
            @RequestParam(required = false) String age_group) {
        List<Profile> profiles = profileService.listProfiles(gender, country_id, age_group).getData();
        
        List<Map<String, Object>> responseData = profiles.stream().map(p -> {
            Map<String, Object> map = new java.util.LinkedHashMap<>();
            map.put("id", p.getId());
            map.put("name", p.getName());
            map.put("gender", p.getGender());
            map.put("age", p.getAge());
            map.put("age_group", p.getAgeGroup());
            map.put("country_id", p.getCountryId());
            return map;
        }).collect(java.util.stream.Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success(responseData));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProfile(@PathVariable UUID id) {
        profileService.deleteProfile(id);
    }
}
