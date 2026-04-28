# Insighta Labs+ Backend Implementation Plan (Stage 3)

## Background & Motivation
The Profile Intelligence System (Stage 2) is functional but lacks authentication, user ownership, and access control. This stage transforms the system into Insighta Labs+, a secure platform serving analysts and engineers across multiple interfaces (CLI and Web Portal).

## Scope & Impact
This plan focuses solely on the **Backend** portion of Stage 3. It involves:
- Implementing GitHub OAuth with PKCE authentication.
- Issuing and managing JWTs (Access and Refresh tokens).
- Establishing Role-Based Access Control (RBAC) for `admin` and `analyst` roles.
- Updating Profile APIs: API versioning, improved pagination, profile creation (using external APIs from Stage 1), and CSV export.
- Implementing application-wide Rate Limiting and Request Logging.
- Maintaining all existing Stage 2 functionality without regressions.

## Proposed Solution: Manual OAuth Flow

### 1. Setup & Database
- Duplicate the `stage2/backend` to `stage3/backend` to serve as the foundation.
- Add necessary dependencies to `pom.xml`: Spring Security, JWT (e.g., jjwt), OpenCSV, and validation libraries.
- Define a `User` entity mapped to a `users` table: `id` (UUID), `github_id`, `username`, `email`, `avatar_url`, `role`, `is_active`, `last_login_at`, `created_at`.
- Add a `refresh_tokens` or implement token invalidation logic (e.g., caching or database) for logout/rotation.

### 2. Authentication Flow (Manual GitHub OAuth + PKCE)
- **`GET /auth/github`**: Redirects to the GitHub OAuth authorization page.
- **`GET /auth/github/callback`**: Manually processes the `code` and `code_verifier`, exchanges them with GitHub, retrieves user info, creates/updates the `User`, and issues JWTs.
- **`POST /auth/refresh`**: Validates the old refresh token, invalidates it, and issues a new pair of Access (3m) and Refresh (5m) tokens.
- **`POST /auth/logout`**: Invalidates the current refresh token server-side.

### 3. Security Configuration (RBAC)
- Configure Spring Security to secure all `/api/*` endpoints.
- Implement a JWT Authentication Filter to validate the Access Token.
- Enforce roles:
  - `admin`: Full access (Create, Delete, Query).
  - `analyst`: Read-only access (Query, Search).

### 4. API Updates & Consistency
- **API Versioning**: Implement a `Filter` or `Interceptor` to enforce the `X-API-Version: 1` header on all `/api/*` endpoints.
- **Pagination**: Update `PagedResponse` to include `total_pages` and navigation `links` (`self`, `next`, `prev`).
- **Create Profile (`POST /api/profiles`)**: Port the external API integration (Genderize, Agify, Nationalize) from Stage 1. Restrict to `admin`.
- **Export Profiles (`GET /api/profiles/export?format=csv`)**: Implement a CSV generator that respects existing filters and sorting.

### 5. Rate Limiting & Logging
- **Rate Limiting**: Implement a filter (using Bucket4j or ConcurrentHashMap) to enforce:
  - `/auth/*`: 10 requests / minute.
  - `/api/*`: 60 requests / minute per user.
- **Logging**: Implement a request interceptor to log Method, Endpoint, Status code, and Response time.

## Phased Implementation Plan
1. **Phase 1: Foundation**: Duplicate project, update dependencies, and create the `User` schema.
2. **Phase 2: Authentication**: Implement the Manual GitHub OAuth flow and token lifecycle endpoints.
3. **Phase 3: Security Integration**: Set up Spring Security, JWT filtering, and Role enforcement.
4. **Phase 4: API Modernization**: Add API versioning, update pagination, implement Profile creation, and add CSV export.
5. **Phase 5: Middleware**: Add Rate Limiting and Logging filters.
6. **Phase 6: Testing**: Ensure Stage 2 features are preserved and new features work flawlessly.

## Verification
- Authentication flows successfully validate PKCE challenges.
- Access tokens expire after 3 minutes; Refresh tokens rotate properly.
- `analyst` users are blocked from `POST /api/profiles`.
- Missing `X-API-Version` returns `400 Bad Request`.
- Rate limiting correctly returns `429 Too Many Requests`.
