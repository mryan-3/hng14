# Stage 1 Backend - Profile Intelligence Service

## Overview
A Spring Boot service that enriches profile names using multiple external APIs (Genderize, Agify, Nationalize) and persists the data in a database.

## Features
- **Data Enrichment**: Integrated with 3 third-party APIs for gender, age, and nationality prediction.
- **Idempotency**: Automatic check to prevent duplicate profiles for the same name.
- **RESTful Endpoints**:
  - `POST /api/profiles`: Create/Enrich a profile.
  - `GET /api/profiles/{id}`: Retrieve a specific profile.
  - `GET /api/profiles`: List profiles with optional filtering (gender, country_id, age_group).
  - `DELETE /api/profiles/{id}`: Remove a profile.
- **Data Standards**:
  - **UUID v7** for all record IDs.
  - **ISO 8601 UTC** timestamps.
  - **JSON** responses following strict naming conventions.
- **Error Handling**: Detailed mapping for upstream API failures (502) and input validation (400, 422).
- **CORS**: Enabled `Access-Control-Allow-Origin: *` for grading script access.

## Tech Stack
- Java 21
- Spring Boot 3.4
- Spring Data JPA
- H2 Database (In-memory)
- Lombok
- java-uuid-generator (for UUID v7)

## How to Run Locally
1. Navigate to `stage1/backend`.
2. Run `./mvnw spring-boot:run` (or use your IDE).
3. The server will start at `http://localhost:8080`.

## API Documentation
- Use `POST /api/profiles` with `{ "name": "ella" }` to start enriching data.
- Use `GET /api/profiles` to see the results.
