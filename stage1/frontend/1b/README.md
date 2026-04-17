# Stage 1B - Testable Profile Card

## Overview
A semantic, accessible, and responsive Profile Card built for HNG Stage 1B. This component showcases user information while meeting strict automated testing requirements through standardized `data-testid` attributes.

## Key Features
- **Semantic HTML**: Built using `<article>`, `<header>`, `<figure>`, `<nav>`, and `<section>` for optimal structure and SEO.
- **Dynamic Time**: Displays the current UTC epoch time in milliseconds, updating in real-time.
- **Accessibility (A11y)**:
  - High color contrast (WCAG AA compliant).
  - Meaningful alt text for the avatar.
  - Keyboard-focusable social links with visible focus states.
  - `aria-live` region for dynamic time updates.
- **Responsive Design**: 
  - Mobile-first: Stacked layout for small screens.
  - Desktop: Grid/Flexbox layout for wider screens.
- **Modern Styling**:
  - Uses the Stage 0 green color palette.
  - Avoids Inter and Open Sans fonts (uses system font stack).
  - Clean layout without decorative side-borders or top-borders.

## Acceptance Criteria Checklist
- [x] Profile card root container (`test-profile-card`)
- [x] User name (`test-user-name`)
- [x] User bio (`test-user-bio`)
- [x] Current time in ms (`test-user-time`)
- [x] Avatar image with alt text (`test-user-avatar`)
- [x] Social links container (`test-user-social-links`)
- [x] Individual social links (e.g., `test-user-social-github`)
- [x] Hobbies list (`test-user-hobbies`)
- [x] Dislikes list (`test-user-dislikes`)

## Local Development
1. Clone the repository.
2. Navigate to `stage1/frontend/1b/`.
3. Open `index.html` in any modern web browser.
