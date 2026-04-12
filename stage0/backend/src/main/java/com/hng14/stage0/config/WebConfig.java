package com.hng14.stage0.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Global configuration for CORS and shared beans like RestClient.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Enables CORS for all endpoints.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }

    /**
     * Creates a reusable RestClient bean for external API calls.
     */
    @Bean
    public RestClient restClient() {
        return RestClient.builder()
                .baseUrl("https://api.genderize.io")
                .build();
    }
}
