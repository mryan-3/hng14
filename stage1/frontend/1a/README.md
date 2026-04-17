# Stage 1A - Advanced Todo Card (Interactive & Stateful)

## Overview
This stage builds upon the foundational Todo Card from Stage 0, transforming it into a fully interactive and stateful component while maintaining the original design aesthetic.

## What Changed from Stage 0
- **State Management**: Centralized JavaScript state drives the UI.
- **Edit Mode**: Interactive form for updating title, description, priority, and due date.
- **Interactive Status**: Synced dropdown and checkbox for Pending, In Progress, and Done transitions.
- **Expand/Collapse**: Collapsible descriptions for better layout management.
- **Time Tracking**: Updates every 30 seconds with granular info and overdue alerts.

## Design Decisions
- **Restored Stage 0 Aesthetic**: Maintained the original color palette (`#059669` accent, `#f0fdf4` background) to ensure consistency.
- **Visual Urgency**: Priority is managed solely through colored badges (High, Medium, Low) and card border-colors for state (e.g., Red for Overdue, Blue for In Progress).
- **Focus Management**: Keyboard focus is handled logically when entering/exiting Edit Mode.

## Accessibility
- Keyboard accessible controls.
- `aria-expanded` and `aria-live` attributes for screen readers.
- Proper focus trapping/return logic in Edit Mode.
