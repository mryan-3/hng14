package com.hng14.stage1.services;

import com.fasterxml.uuid.Generators;
import com.fasterxml.uuid.impl.TimeBasedEpochGenerator;
import com.hng14.stage1.dto.ApiResponse;
import com.hng14.stage1.dto.ExternalApiDtos.*;
import com.hng14.stage1.entities.Profile;
import com.hng14.stage1.repositories.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final TimeBasedEpochGenerator uuidGenerator = Generators.timeBasedEpochGenerator();

    public ApiResponse<Profile> createProfile(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing or empty name");
        }

        // Idempotency check
        Optional<Profile> existing = profileRepository.findByNameIgnoreCase(name.trim());
        if (existing.isPresent()) {
            return ApiResponse.success(existing.get(), "Profile already exists");
        }

        // Enrich data from external APIs
        GenderizeResponse genderData = fetchGender(name);
        AgifyResponse ageData = fetchAge(name);
        NationalizeResponse countryData = fetchCountry(name);

        // Process age group
        String ageGroup = classifyAgeGroup(ageData.getAge());

        // Process country with highest probability
        Country topCountry = countryData.getCountry().stream()
                .max(Comparator.comparing(Country::getProbability))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Nationalize returned no country data"));

        Profile profile = Profile.builder()
                .id(uuidGenerator.generate())
                .name(name.trim().toLowerCase())
                .gender(genderData.getGender())
                .genderProbability(genderData.getProbability())
                .sampleSize(genderData.getCount())
                .age(ageData.getAge())
                .ageGroup(ageGroup)
                .countryId(topCountry.getCountryId())
                .countryProbability(topCountry.getProbability())
                .createdAt(OffsetDateTime.now(ZoneOffset.UTC))
                .build();

        return ApiResponse.success(profileRepository.save(profile));
    }

    public ApiResponse<Profile> getProfile(UUID id) {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found"));
        return ApiResponse.success(profile);
    }

    public ApiResponse<List<Profile>> listProfiles(String gender, String countryId, String ageGroup) {
        List<Profile> profiles = profileRepository.findByFilters(gender, countryId, ageGroup);
        return ApiResponse.success(profiles);
    }

    public void deleteProfile(UUID id) {
        if (!profileRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found");
        }
        profileRepository.deleteById(id);
    }

    private GenderizeResponse fetchGender(String name) {
        String url = "https://api.genderize.io?name=" + name;
        try {
            GenderizeResponse res = restTemplate.getForObject(url, GenderizeResponse.class);
            if (res == null || res.getGender() == null || res.getCount() == 0) {
                throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Genderize returned an invalid response");
            }
            return res;
        } catch (Exception e) {
            if (e instanceof ResponseStatusException) throw e;
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Genderize returned an invalid response");
        }
    }

    private AgifyResponse fetchAge(String name) {
        String url = "https://api.agify.io?name=" + name;
        try {
            AgifyResponse res = restTemplate.getForObject(url, AgifyResponse.class);
            if (res == null || res.getAge() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Agify returned an invalid response");
            }
            return res;
        } catch (Exception e) {
            if (e instanceof ResponseStatusException) throw e;
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Agify returned an invalid response");
        }
    }

    private NationalizeResponse fetchCountry(String name) {
        String url = "https://api.nationalize.io?name=" + name;
        try {
            NationalizeResponse res = restTemplate.getForObject(url, NationalizeResponse.class);
            if (res == null || res.getCountry() == null || res.getCountry().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Nationalize returned an invalid response");
            }
            return res;
        } catch (Exception e) {
            if (e instanceof ResponseStatusException) throw e;
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Nationalize returned an invalid response");
        }
    }

    private String classifyAgeGroup(int age) {
        if (age <= 12) return "child";
        if (age <= 19) return "teenager";
        if (age <= 59) return "adult";
        return "senior";
    }
}
