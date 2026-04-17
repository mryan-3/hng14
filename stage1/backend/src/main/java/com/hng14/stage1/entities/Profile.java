package com.hng14.stage1.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "profiles")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id
    private UUID id;

    @Column(unique = true, nullable = false)
    private String name;

    private String gender;

    @Column(name = "gender_probability")
    private Double genderProbability;

    @Column(name = "sample_size")
    private Integer sampleSize;

    private Integer age;

    @Column(name = "age_group")
    private String ageGroup;

    @Column(name = "country_id")
    private String countryId;

    @Column(name = "country_probability")
    private Double countryProbability;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;
}
