# HNG Stage 0 Backend: Name Classification API

A production-ready Spring Boot API that integrates with the Genderize API to provide name classification and confidence scoring.

## How to Run Locally

### Prerequisites
- **Java 21** or higher
- **Maven 3.9+**

### Steps
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/mryan-3/hng14.git
    cd hgn14/stage0/backend
    ```
2.  **Build the project**:
    ```bash
    ./mvnw clean install
    ```
3.  **Run the application**:
    ```bash
    ./mvnw spring-boot:run
    ```
4.  **Test the endpoint**:
    ```bash
    curl "http://localhost:8080/api/classify?name=Alex"
    ```

## Decisions Made

### 1. Architecture: Layered & Decoupled
The project follows a strict layered architecture:
-   **Controllers**: Handle HTTP routing and input validation.
-   **Services**: Encapsulate business logic and external API orchestration.
-   **DTOs (Records)**: Define the immutable "contract" for data exchange.
-   **Exceptions**: Centralized global error handling via `@RestControllerAdvice`.

### 2. Modern Tooling (Java 21 + Spring Boot 3.4+)
-   **Java Records**: Used for all data models (DTOs). Records are immutable, concise, and ensure thread-safety.
-   **RestClient**: Leveraged the new `RestClient` (introduced in Spring 6.1) for a fluent, efficient, and modern way to perform external API calls compared to the legacy `RestTemplate`.
-   **ZonedDateTime**: Used `java.time` for ISO 8601 UTC timestamp generation to ensure consistency and precision.

### 3. Resilience & Error Handling
-   **Global Exception Handling**: Any error anywhere in the system is automatically caught and converted into the required `{ "status": "error", "message": "..." }` format, preventing stack trace leakage and ensuring a consistent API experience.
-   **Edge Case Handling**: Specifically handles Genderize results where `gender` is `null` or `count` is `0` as "No prediction available" (400 Bad Request).

## Trade-offs
-   **Synchronous vs. Asynchronous**: For this task, a synchronous `RestClient` was used for simplicity and to meet the <500ms response time requirement. For extremely high-load environments, a reactive `WebClient` might be considered.
-   **In-Memory vs. Caching**: For Stage 0, no caching layer (like Redis) was implemented. In a high-traffic production app, we would cache Genderize responses to reduce external latency and stay within rate limits.
