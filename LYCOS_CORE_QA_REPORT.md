# LYCOS CORE - FULL-STACK QA AUDIT REPORT

**Audit Date:** 2026-08-06  
**Auditor Engine:** `lmstudio_qa` (`qwen2.5-vl-7b-instruct` + Playwright Headless Chromium)  
**Target Environment:** `http://lycos-core.local`

---

## Executive Summary
A comprehensive full-stack QA audit was executed across the `Lycos Core` application against 5 core architectural and visual directives. Multiple discrepancies were identified across navigation routing, brand typography consistency, glassmorphic container styling, WordPress footprint exposure, and inline CSS usage.

---

## QA Audit Findings by Severity

### 🔴 Critical Issues

1. **Navigation & Route Coverage Gaps (`Navigation`)**
   * **Target:** Primary Header Navigation (`// CORE`, `// PROTOCOLS`, `// INTEL`, `// THE COLLECTIVE`)
   * **Discrepancy:** Navigation items lack distinct canonical destinations or active route handlers.
   * **Missing Component:** Standalone QA section/page link is missing from the global navigation structure.
   * **Orphaned Routes:** Pages defined in source (`ProtocolKinetic`, `ProtocolApex`, `ProtocolCitadel`, `MasterFAQPage`, `LegalPages`) are not systematically linked in header/footer navigation.

2. **Missing Contact Page Map Component (`Navigation / Components`)**
   * **Target:** Contact Section / Contact Page (`#contact`)
   * **Discrepancy:** The Contact section lacks an embedded interactive Map component/iframe enclosed in a glassmorphic container.

3. **WordPress Footprint & White-Labeling Violations (`WP Obfuscation`)**
   * **Target:** `app/public/index.html` & HTTP Response Headers
   * **Discrepancy:** Unobfuscated WordPress assets and metadata:
     * Generator meta tag present (`<meta name="generator" content="WordPress...">`).
     * Direct `/wp-content/` and `/wp-includes/` asset URLs exposed.
     * WordPress REST API user discovery endpoints (`/wp-json/wp/v2/users`) and default headers (`X-Powered-By`, `Wp-Emoji-Styles`) remain active.

---

### 🟡 Visual Discrepancies

4. **Green Full Stop Accent Standardization (`Headings`)**
   * **Target:** All primary headlines (`h1`, `h2`), section titles, and sub-headings across `App.tsx` and components.
   * **Discrepancy:** 
     * Inconsistent usage of `.accent-dot` / `.brand-dot` across component headings.
     * Primary brand green hex color mismatch between CSS root variable (`#8CFF32`) and CTA button green (`#84ff2b` / `rgb(132, 255, 43)`).
   * **Requirement:** Enforce `<span class="brand-dot">.</span>` on all primary headings with standardized class:
     ```css
     .brand-dot {
       color: #84ff2b;
       display: inline;
     }
     ```

5. **Glassmorphic Card Transparency Mismatch (`Glassmorphism`)**
   * **Target:** `.unit-card`, `.protocol-card`, `.solution-card`, sidebar containers, and navigation panels.
   * **Discrepancy:** Discrepancy between left navigation tabs (`rgba(10, 25, 47, 0.7)`) and right content panels (`rgba(255, 255, 255, 0.03)`).
   * **Requirement:** Standardize all content containers to the uniform dark-blueish glass baseline:
     ```css
     background: rgba(10, 25, 47, 0.45);
     backdrop-filter: blur(12px);
     border: 1px solid rgba(132, 255, 43, 0.15);
     border-radius: 12px;
     ```

---

### 🔵 Code Quality & Optimization Items

6. **Inline Styling Elimination (`Code Quality`)**
   * **Target:** `TechServicesSection.tsx`, `AIProductsSection.tsx`, `App.tsx`
   * **Discrepancy:** Heavy reliance on inline `style={{ ... }}` attributes (e.g. padding, typography, colors) rather than clean utility CSS classes.

7. **CSS `!important` Cleanup (`Code Quality`)**
   * **Target:** `index.css`, `App.css`
   * **Discrepancy:** Non-standard specificity overrides using `!important`. Must be refactored to standard CSS cascading rules.

---

## Summary Checklist Matrix

| Directive | Component / Target | Status | Priority |
| :--- | :--- | :---: | :---: |
| 1. Green Heading Full Stop | Global `h1`/`h2` titles | ❌ Mismatch | High |
| 2. Glassmorphic Alignment | Content & Feature Cards | ❌ Non-Uniform | High |
| 3. Route & Map Audits | Contact Map & Nav Links | ❌ Missing Links | Critical |
| 4. WP White-Labeling | Meta, Headers & Asset Paths | ❌ Un-Obfuscated | Critical |
| 5. Clean Code Standards | Inline `style=""` & `!important` | ❌ Non-Compliant | Medium |
