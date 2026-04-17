# Profile Intelligence Service - HNG Stage 1

A Spring Boot backend service that integrates multiple third-party APIs to enrich profile data, persists results in an H2 database, and provides a RESTful management API.

## Features
- **Multi-API Integration**: Aggregates data from Genderize, Agify, and Nationalize.
- **Data Persistence**: Uses Spring Data JPA with an H2 in-memory database.
- **Idempotency**: Intelligently handles duplicate name submissions.
- **UUID v7**: All profile IDs follow the UUID v7 standard (time-ordered).
- **ISO 8601 UTC**: All timestamps are formatted in UTC.
- **CORS Support**: Global CORS enabled for all origins.

## Prerequisites
- **Java 21** or higher.
- **Maven 3.x** (or use the included wrapper).

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd hng14/stage1/backend
```

### 2. Run the application
Using the Maven wrapper:
```bash
./mvnw spring-boot:run
```
Or if you have Maven installed:
```bash
mvn spring-boot:run
```

The server will start at `http://localhost:8080`.

## API Endpoints

### Create a Profile
```bash
curl -X POST http://localhost:8080/api/profiles \
     -H "Content-Type: application/json" \
     -d '{"name": "ella"}'
```

### Get a Profile by ID
```bash
curl http://localhost:8080/api/profiles/{uuid-v7-id}
```

### List/Filter Profiles
```bash
curl "http://localhost:8080/api/profiles?gender=female&country_id=CD"
```

### Delete a Profile
```bash
curl -X DELETE http://localhost:8080/api/profiles/{uuid-v7-id}
```

## Database Console
You can access the H2 console at `http://localhost:8080/h2-console` with the following credentials:
- **JDBC URL**: `jdbc:h2:mem:profiledb`
- **User Name**: `sa`
- **Password**: (leave empty)
