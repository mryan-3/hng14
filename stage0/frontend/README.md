# HNG Stage 0: Testable Todo Item Card

A high-fidelity, accessible, and testable Todo Item Card built with pure HTML, CSS, and JavaScript.

## Live Preview
https://mryan-3.github.io/hng14/stage0/frontend/

## How to Run Locally

1.  **Clone the repository**:
    ```bash
    git clone git@github.com:mryan-3/hng14.git
    cd hng14/stage0/frontend
    ```
2.  **Open in Browser**:
    Open the `index.html` file in any modern web browser.

    *Alternatively, use a local server:*
    ```bash
    python3 -m http.server 8000
    # Visit http://localhost:8000
    ```

## Design Decisions

### 1. Multi-Stage Organization
The project is located in `stage0/frontend/` to allow for clean separation between different internship stages and to accommodate both frontend and backend tasks in a single repository.

### 2. Inline SVGs vs. External Icons
I used **Inline SVGs** instead of external icon CDNs.
- **Performance**: Zero extra HTTP requests; loads instantly with the HTML.
- **Reliability**: The card works perfectly offline and is independent of third-party CDN uptime.
- **Styling**: SVGs inherit `currentColor` from CSS, ensuring seamless theming.

### 3. Aesthetics & Accessibility
- **Color Palette**: An "Emerald & Forest" theme (`#059669`) for a professional, high-contrast UI.
- **Typography**: Geometric "Segoe UI/Roboto" stack for maximum readability.

## Implementation Details

- **Time Calculation**: Updates the "Time Remaining" every 30 seconds via JavaScript.
- **Accessibility**:
  - Full keyboard navigation (Tab-ready).
  - ARIA labels for icon-only actions.
  - Semantic tags (`article`, `time`, `header`, `footer`).
- **Testability**: Includes `data-testid` attributes for automated grading.
