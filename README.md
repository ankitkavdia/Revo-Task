````md
# Revo Task — Frontend Developer Trial (DASHBOARD-TRIAL-REVO-2026-01)

This repository contains a single-page, responsive dashboard UI rebuilt from a provided screenshot as part of a Frontend Developer trial evaluation. The objective of this task is to demonstrate real coding ability, component structure, and visual approximation skills using the required stack.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Trial Requirements Coverage](#trial-requirements-coverage)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [1) Clone the Repository](#1-clone-the-repository)
  - [2) Install Dependencies](#2-install-dependencies)
  - [3) Run the App Locally](#3-run-the-app-locally)
  - [4) Build for Production](#4-build-for-production)
- [Project Structure](#project-structure)
- [Key UI Sections Implemented](#key-ui-sections-implemented)
- [Mock Data + React Query (Loading & Error States)](#mock-data--react-query-loading--error-states)
- [Responsiveness and Layout Strategy](#responsiveness-and-layout-strategy)
- [Component Standards and Conventions](#component-standards-and-conventions)
- [UI Accuracy / Visual Approximation Notes](#ui-accuracy--visual-approximation-notes)
- [Deployment (Vercel / Netlify)](#deployment-vercel--netlify)
- [Troubleshooting](#troubleshooting)
- [Notes (Structure / Choices)](#notes-structure--choices)

---

## Project Overview

This project recreates a dashboard page based on a screenshot (no Figma). The page is built to be responsive, visually close to the provided reference, and structured in a clean, production-oriented component architecture.

The implementation emphasizes:

- Accurate layout composition and spacing approximation
- Modular component structure (each UI section in its own file)
- Consistent design tokens and styling patterns
- React Query usage with mocked APIs and explicit loading/error UI states
- No backend integration; all data is mocked locally

Reference code used across this project:
- `DASHBOARD-TRIAL-REVO-2026-01`

---

## Trial Requirements Coverage

This implementation meets the stated client requirements:

- Recreate the provided screenshot as a responsive page
- Stack: React + Vite, TypeScript, Tailwind CSS, Shadcn UI components
- Use React Query with mocked data and loading/error states
- No backend integration
- Approximate spacing, fonts, and colors without Figma
- Ready for submission with repo + setup instructions + notes + deploy support

---

## Tech Stack

Core:

- React (UI composition)
- Vite (fast dev server + build tooling)
- TypeScript (strict typing and maintainability)
- Tailwind CSS (utility-first styling and responsiveness)

UI / Components:

- Shadcn UI component patterns (Button, Card, Alert, Skeleton, Popover, Dropdown Menu, etc.)
- Lucide icons for consistent iconography

Data Layer:

- React Query (`@tanstack/react-query`) for:
  - Mocked data fetching
  - Caching and invalidation patterns
  - Standardized loading and error state handling per component

---

## Getting Started

### 1) Clone the Repository

```bash
git clone https://github.com/ankitkavdia/Revo-Task.git
cd Revo-Task
````

### 2) Install Dependencies

```bash
npm install
```

### 3) Run the App Locally

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) that you can open in your browser.

### 4) Build for Production

```bash
npm run build
```

To locally preview the production build:

```bash
npm run preview
```

---

## Project Structure

The project is organized to keep the dashboard modular and easy to review:

```txt
src/
  app/
    App.tsx
    providers.tsx
  components/
    layout/
      Header.tsx
      PageContainer.tsx
    dashboard/
      LatestUpdates/
        LatestUpdates.tsx
        UpdateChip.tsx
        index.ts
      TopTabs/
        TopTabs.tsx
        index.ts
      NeedsApproval/
        NeedsApproval.tsx
        ApprovalItem.tsx
        index.ts
      PayoutsLastQuarter/
        PayoutsLastQuarter.tsx
      PartnerFunnel/
        PartnerFunnel.tsx
        FunnelBlock.tsx
        index.ts
      ProgramGrowth/
        ProgramGrowth.tsx
        index.ts
      Stats/
        StatCard.tsx
        index.ts
      DashboardRightRail/
        DashboardRightRail.tsx
        AvatarRail.tsx
  features/
    dashboard/
      dashboard.api.ts
      dashboard.mock.ts
      dashboard.queries.ts
      dashboard.types.ts
  pages/
    DashboardPage.tsx
  lib/
    queryClient.ts
    utils.ts
  styles/
    globals.css
```

Key points:

* Each major UI section is a separate component folder/file.
* Shared utilities and query client configuration are centralized under `src/lib`.
* Dashboard mock typing and query behavior can be consolidated in `src/features/dashboard` (if used in your current structure).

---

## Key UI Sections Implemented

The dashboard is composed in `src/pages/DashboardPage.tsx` using a consistent, modular layout:

* Header

  * Breadcrumbs
  * Title and search input
  * Metadata pills (NAME, ID, Status)
  * Fully responsive (desktop vs tablet/mobile layout behavior)

* Latest Updates strip

  * Chip-based activity updates with scrollable behavior
  * Loading skeleton and retry error state

* Top Tabs strap

  * Main tabs row (horizontal, active styling)
  * Sub-tabs row (segmented)
  * Toolbar row with:

    * Dropdown
    * Date range popover
    * Search field
    * Filter / Export actions
  * Desktop and mobile layouts implemented separately for accuracy

* Needs Approval

  * Highlight container with accent stripe
  * Grid layout on desktop and horizontal scroll on smaller devices
  * Loading skeleton and error retry state

* Payouts Last Quarter

  * Bar visualization using Tailwind-based blocks
  * Loading skeleton and error retry state

* Partner Funnel

  * Green panel with tabs and funnel blocks
  * Loading skeleton and error retry state

* Stat Cards

  * Compact/wide density support
  * Clean structure to match screenshot spacing and typography

* Program Growth

  * Tab-based breakdown (Application/Product/Campaign)
  * Metric headline and progress bars
  * Loading skeleton and error retry state

* Right Rail (Desktop only)

  * Collapsible rail behavior with open/close states
  * Open state shows chat panel content only (no avatar strip)
  * Closed state shows avatar list only
  * Normal flow layout (no sticky) per requirement
  * Cursor pointer applied on interactive elements

---

## Mock Data + React Query (Loading & Error States)

All “data” is intentionally mocked to satisfy the trial constraints and to demonstrate state handling patterns:

* Each dashboard section that needs dynamic content uses `useQuery(...)`.
* Each mock fetch function includes:

  * Artificial latency (`setTimeout` / `sleep`)
  * Random error simulation (small % chance) to validate error-state UI
* Every section implements:

  * Loading state (Skeleton UI)
  * Error state (Alert UI + Retry action)
  * Success state (final UI)

This ensures reviewers can quickly validate:

* Consistent async state design
* Component-level resilience
* Clean separation between UI and data acquisition logic

---

## Responsiveness and Layout Strategy

The page is designed to be responsive across:

* Mobile phones
* Tablets
* Desktop
* Wide desktop displays (xl+)

Key implementation details:

* A max width container is used consistently to mirror the screenshot’s centered layout.
* Desktop and mobile layouts are explicitly defined in certain components to match UI behavior precisely.
* Horizontal scrolling is used only where it matches the reference (e.g., chips and approval cards on small screens).
* The right rail is only visible on xl+ to avoid crowding the layout on smaller devices.

---

## Component Standards and Conventions

This project follows a clean, review-friendly coding approach:

* Single responsibility per component
* Localized component folders for larger sections
* Strong typing for mocked responses and UI props
* Explicit UI states (loading/error/success)
* Tailwind class composition for readable styles
* Reuse of Shadcn-like primitives (Button, Card, Alert, Skeleton, Popover, Dropdown)
* Icons from Lucide to match modern UI expectations

---

## UI Accuracy / Visual Approximation Notes

Because no Figma was provided, the visual implementation is an approximation based on:

* Relative sizing and spacing derived from the screenshot
* A consistent neutral palette plus accent green tone
* Rounded corners, subtle shadows, and muted text tones to match the reference style
* Layout breakpoints designed to preserve the same “information hierarchy” across devices

Where visual decisions are made, the priority order is:

1. Layout structure and hierarchy
2. Component spacing and density
3. Typography scale and weights
4. Color approximation and subtle UI accents

---

## Deployment (Vercel / Netlify)

This project is compatible with standard Vite deployments.

### Vercel

* Framework preset: Vite
* Build command: `npm run build`
* Output directory: `dist`

### Netlify

* Build command: `npm run build`
* Publish directory: `dist`

---

## Troubleshooting

### TypeScript build errors on Vercel related to unused `React` imports

If `tsc -b` fails with errors like:

* `TS6133: 'React' is declared but its value is never read.`

Fix:

* Remove `import React from "react";` from files that do not reference `React.*`
* If hooks are required, import only what is used:

  * `import { useState, useEffect, useMemo } from "react";`

### Prop mismatch errors (MessageItem)

If you see errors like:

* `Property 'text' does not exist on type 'MessageItemProps'`

Fix:

* Ensure the prop name matches the component contract (`message` vs `text`), and update usage consistently.

---

## Notes (Structure / Choices)

* Each dashboard section is split into its own component folder to keep the page readable and to reflect production-level component organization.
* React Query is used even with mocked data to demonstrate realistic loading/error patterns and the ability to scale to real APIs later without refactoring UI logic.
* Responsive behavior is intentional and mirrors screenshot patterns: dense desktop composition and simplified mobile stacking with selective horizontal scrolling where needed.
* Shadcn-style components are used wherever appropriate to maintain consistent UI primitives (alerts, skeletons, buttons, popovers, dropdowns).

---

```
```
