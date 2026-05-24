# Implementation Plan - DIYABI.COM

This plan outlines the steps to build the DIYABI.COM web platform, a marketplace connecting DIY enthusiasts with materials, masters, and finished products.

## Goal Description
Create a responsive web application that allows users to:
1.  Watch DIY videos.
2.  Purchase materials listed in the video.
3.  Hire masters rated by the community.
4.  Buy the finished product directly.

## User Review Required
> [!IMPORTANT]
> **Styling**: The project will use Vanilla CSS for styling as per strict guidelines, ensuring maximum flexibility and performance without external CSS frameworks like Tailwind (unless requested).
> **Mock Data**: Initially, the application will use static mock data to populate the lists (Materials, Masters, Products) for the prototype.

## Proposed Changes

### Project Initialization
- Initialize a **Next.js** application with **TypeScript**.
- Configuration:
    - `eslint` and `prettier` setup.
    - `globals.css` for CSS variables and base styles.

### Component Architecture
The application will be broken down into reusable components:

#### [NEW] `components/Header/Header.tsx` & `Header.css`
- Navigation bar containing the logo "DIYABI.COM" and navigation links.

#### [NEW] `components/VideoSection/VideoPlayer.tsx` & `VideoPlayer.css`
- A responsive video container.
- Placeholder integration for YouTube/Instagram embeds.

#### [NEW] `components/Lists/MaterialList.tsx` & `MaterialList.css`
- Displays a list of materials with prices.
- Logic to calculate total cost if multiple items selected (future feature, basic list for now).

#### [NEW] `components/Lists/MasterList.tsx` & `MasterList.css`
- Displays a list of masters.
- Star rating component logic.

#### [NEW] `components/Product/ReadyProduct.tsx` & `ReadyProduct.css`
- Highlighted section for the finished product purchase.

### Data Layer
#### [NEW] `data/mockData.ts`
- Exports constant arrays for `materials`, `masters`, and `products`.

### Pages
#### [MODIFY] `app/page.tsx`
- The main landing page assembling all the above components.

## Phase 2: Design Polish & Assets [NEW]
- **Design System**: Refine `globals.css` with a "Clean Workshop" theme (modern slates, vibrant accents).
- **Assets**: Generate properties specific images for mock data.
- **Component Updates**:
    - Add image support to `MaterialList`, `MasterList`, and `ReadyProduct`.
    - Enhance UI with better spacing, cards, and hover effects.

## Verification Plan

### Automated Tests
- **Build Check**: Run `npm run build` to ensure no type errors or build failures.
- **Lint Check**: Run `npm run lint` to verify code quality.

### Manual Verification
- **Browser Testing**:
    - Launch the dev server `npm run dev`.
    - Verify the "DIYABI.COM" logo is visible.
    - Check if the Video Player loads.
    - specific check: Verify "Malzeme 1" costs "100 TL".
    - specific check: Verify "Usta 2" has 4 stars.
    - specific check: Verify "Ready Product" price is "500 TL".
    - Test responsiveness on mobile and desktop viewports.
