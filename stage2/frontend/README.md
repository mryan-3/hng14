# Invoice Management Application

A full-stack-like invoice management system built with Next.js, featuring a robust state management system, persistent storage, and a pixel-perfect responsive design.

## Getting Started

### Prerequisites
- Node.js 18.x or later
- pnpm (Preferred)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Architecture

### Core Tech Stack
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API (`InvoiceContext`)
- **Persistence**: `localStorage` via a custom hook and provider system.

### Implementation Details
- **Global State**: The application uses a centralized `InvoiceProvider` that wraps the root layout. This ensures data consistency across the Home and Detail views.
- **Controlled Components**: The `InvoiceForm` and its sub-sections (Bill From, Bill To, Item List) are implemented as controlled components to ensure data integrity during complex edits.
- **Modular Components**: The codebase is organized into logical units:
  - `/components/invoice`: Visual representations of invoice data.
  - `/components/forms`: Complex form logic and input synchronization.
  - `/components/ui`: Low-level primitives like status badges, date pickers, and buttons.

---

## Trade-offs

### Context API vs. State Management Libraries
For a project of this scope, we opted for the **React Context API** instead of Redux or Zustand. This minimized bundle size and architectural complexity while providing perfectly adequate performance for the 50-100 invoices typical for this use case.

### LocalStorage vs. Database
We used **LocalStorage** for persistence. This allows for an entirely client-side experience with zero latency, making the app feel "snappy." While it lacks cross-device synchronization, it provides a robust "offline-first" experience without the overhead of a backend.

---

## Accessibility Notes

- **Semantic HTML**: Extensive use of `main`, `aside`, `section`, and `article` tags to provide a clear document map for screen readers.
- **Contrast & Color**: The application features both Light and Dark modes, carefully tuned to meet high contrast requirements for readability.
- **Interactive Feedback**: All buttons and links feature distinct hover, active, and focus states to guide users through the workflow.
- **Layout Stability**: Implemented `scrollbar-gutter: stable` to prevent layout shifts when modals or drawers are opened, ensuring a smooth experience for users sensitive to motion.

---

## Improvements Beyond Requirements

- **Pixel-Perfect Alignment**: Implemented a custom multi-row grid system for the Invoice Detail page to ensure horizontal baselines of dates and addresses align perfectly across all devices.
- **Responsive Sidebar**: The sidebar is custom-tailored for three breakpoints, transitioning from a top header on mobile to a fixed full-height navigation bar on desktop with a unique profile/theme-toggle layout.
- **Dynamic Filtering**: Added a robust status filter that works seamlessly with the persistent state.
- **Validation Guards**: Added hydration mismatch guards and mounted-state checks to ensure the app remains stable during SSR/CSR transitions.

---
