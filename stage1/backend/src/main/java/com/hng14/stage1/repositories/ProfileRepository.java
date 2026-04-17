package com.hng14.stage1.repositories;

import com.hng14.stage1.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, UUID> {
    Optional<Profile> findByNameIgnoreCase(String name);

    @Query("SELECT p FROM Profile p WHERE " +
           "(:gender IS NULL OR LOWER(p.gender) = LOWER(:gender)) AND " +
           "(:countryId IS NULL OR LOWER(p.countryId) = LOWER(:countryId)) AND " +
           "(:ageGroup IS NULL OR LOWER(p.ageGroup) = LOWER(:ageGroup))")
    List<Profile> findByFilters(
            @Param("gender") String gender,
            @Param("countryId") String countryId,
            @Param("ageGroup") String ageGroup
    );
}
