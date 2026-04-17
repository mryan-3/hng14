package com.hng14.stage1.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

public class ExternalApiDtos {
    @Data
    public static class GenderizeResponse {
        private String name;
        private String gender;
        private Double probability;
        private Integer count;
    }

    @Data
    public static class AgifyResponse {
        private String name;
        private Integer age;
        private Integer count;
    }

    @Data
    public static class NationalizeResponse {
        private String name;
        private List<Country> country;
    }

    @Data
    public static class Country {
        @JsonProperty("country_id")
        private String countryId;
        private Double probability;
    }
}
