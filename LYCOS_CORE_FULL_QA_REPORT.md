# LYCOS CORE - SITE-WIDE MULTI-PAGE QA AUDIT REPORT

**Audit Date:** 2026-08-06  
**Auditor Engine:** `lmstudio_qa` (`qwen2.5-vl-7b-instruct` + Playwright Multi-Page Crawler)  
**Base URL:** `http://lycos-core.local/`  
**Total Routes Evaluated:** 9 Distinct Pages & Sub-sections

---

## Executive Summary
A 100% local multi-page QA sweep was conducted across the Lycos Core web application. The crawler navigated all accessible routes (`/`, `/#tech-services`, `/#incubation-hub`, `/#governance`, `/#contact`, `/protocol-apex`, `/protocol-citadel`, `/protocol-kinetic`, and `/faq`). Visual payloads were evaluated by `qwen2.5-vl-7b-instruct` against the 5 QA directives. Significant systemic discrepancies were found in heading accent green values, glassmorphic card transparency, navigation accessibility, and WordPress footprint exposure.

---

## Route-by-Route QA Audit Breakdown

### 1. Homepage / Hero (`http://lycos-core.local/`)
* **Status:** `FAIL`
* **Headings:** Missing brand green full stop accent (`.brand-dot`) on hero titles (`Precision AI Systems`, `Engineered with Instinct`). Accent color mismatch (`#8CFF32` used in root vs `#84ff2b` target).
* **Glassmorphism:** Hero glass containers use non-standard `rgba(255, 255, 255, 0.03)` instead of uniform `rgba(10, 25, 47, 0.45)`.
* **Navigation:** Header links (`// CORE`, `// PROTOCOLS`, `// INTEL`, `// THE COLLECTIVE`) do not route to dedicated anchor targets or subpages. Standalone QA page link missing.
* **WP Obfuscation:** Generator meta tag exposed in `<head>`; `/wp-content/` asset links visible in source.

### 2. Tech Services Section (`http://lycos-core.local/#tech-services`)
* **Status:** `FAIL`
* **Headings:** Heading `Engineer the Infrastructure Your Scale Demands` lacks `<span class="brand-dot">.</span>`.
* **Glassmorphism:** Service card backgrounds inconsistent with global glass baseline (`rgba(255, 255, 255, 0.03)` with border `#rgba(255,255,255,0.08)`).
* **Code Quality:** Over 30 inline `style={{ ... }}` declarations found in `TechServicesSection.tsx`.

### 3. Incubation Hub Section (`http://lycos-core.local/#incubation-hub`)
* **Status:** `FAIL`
* **Headings:** Headings missing green accent dot.
* **Glassmorphism:** Non-uniform background transparency across timeline steps and incubation cards.
* **WP Obfuscation:** Asset URLs leaking `/wp-content/` paths.

### 4. Governance & Security (`http://lycos-core.local/#governance`)
* **Status:** `FAIL`
* **Headings:** Section title lacks green full stop accent.
* **Glassmorphism:** Security protocol cards lack uniform `backdrop-filter: blur(12px)` and `border: 1px solid rgba(132, 255, 43, 0.15)`.

### 5. Contact Section (`http://lycos-core.local/#contact`)
* **Status:** `FAIL`
* **Navigation & Components:** **CRITICAL:** Missing embedded Google Maps component/iframe within a glassmorphic card container.
* **Headings:** Contact headline missing green dot accent.

### 6. Protocol Apex Page (`http://lycos-core.local/protocol-apex`)
* **Status:** `FAIL`
* **Navigation:** Page is orphaned (not linked from main header navigation).
* **Headings:** Title `Protocol Apex` rendered in plain white without green full stop.
* **Glassmorphism:** Background transparency darker than baseline `rgba(10, 25, 47, 0.45)`.
* **Code Quality:** Inline styles and `!important` flags present in template file.

### 7. Protocol Citadel Page (`http://lycos-core.local/protocol-citadel`)
* **Status:** `FAIL`
* **Navigation:** Orphaned page; no back-navigation or header link.
* **Headings:** Page title missing green accent.
* **WP Obfuscation:** Leaking `/wp-content/` directory references in compiled bundle.

### 8. Protocol Kinetic Page (`http://lycos-core.local/protocol-kinetic`)
* **Status:** `FAIL`
* **Navigation:** Orphaned page.
* **Headings:** Page title missing green accent.
* **Glassmorphism:** Card background opacity inconsistent.

### 9. Master FAQ Page (`http://lycos-core.local/faq`)
* **Status:** `FAIL`
* **Navigation:** Orphaned page.
* **Headings:** Accordion headers and page title missing green full stop.
* **Code Quality:** `!important` overrides detected in FAQ accordion styling.

---

## Global Site-Wide Discrepancies Summary

| Category | Primary Finding | Impact | Severity |
| :--- | :--- | :--- | :---: |
| **1. Green Heading Dots** | Mismatch between `#8CFF32` and CTA green `#84ff2b`; missing `<span class="brand-dot">.</span>` across titles | Brand identity inconsistency | High |
| **2. Glassmorphism** | Cards use mixed opacities (`rgba(255,255,255,0.03)` vs `rgba(10,25,47,0.7)`) instead of uniform `rgba(10,25,47,0.45)` | Visual fragmentation | High |
| **3. Navigation & Map** | Header links unhandled; 4 orphan subpages; missing Contact map & QA page link | User experience & SEO | Critical |
| **4. WP Obfuscation** | `<meta name="generator">`, `/wp-content/` links, REST API headers exposed | Security & White-labeling | Critical |
| **5. Code Quality** | Widespread inline `style=""` attributes and `!important` CSS tags | Maintainability | Medium |
