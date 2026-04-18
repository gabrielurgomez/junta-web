---
name: ui-components
description: Describes the architecture, structure, and guidelines for creating UI components within the project.
---

# UI Components Guidelines

This document outlines the standard practices and guidelines for building UI components in the Junta Regional de Calificación de Invalidez de Santander web project.

## Component Modularization

- **Dedicated Files:** UI components (such as `Hero`, `Cards`, `NavBar`, `Banners`, `Modals`, etc.) must be extracted into their own dedicated files inside the `src/components/` directory.
- **Example:** The landing page `src/app/page.tsx` should not contain the full markup for a complex Hero section. Instead, this should be abstracted away into an independent `src/components/Hero.tsx` component that is later imported.

## Reusability and Props

- Components must be designed with reusability in mind.
- They must accept and use the appropriate **Props** needed for their rendering and functionality (e.g., custom texts, states, event handlers, optional classes) rather than hardcoding business logic that narrows their usage.

## Accessibility (a11y)

- **Mandatory Requirement:** Every UI component *must* include appropriate accessibility tags.
- This includes the use of `aria-label`, `aria-hidden`, `aria-describedby`, `role`, proper `alt` text for images, and semantic HTML (e.g., `<nav>`, `<main>`, `<section>`, `<article>`) to correctly serve screen readers and other accessibility mechanisms.
- All interactive components must be fully navigable and operative via keyboard.
