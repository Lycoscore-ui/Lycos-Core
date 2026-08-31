# Lycos Core — Gold-Standard Page Specification & QA Directives

**Reference Master Page:** `http://lycos-core.local/ai-consulting`  
**Purpose:** Universal benchmark standard for all pages, sections, and interactive components across the Lycos Core web platform.

---

## 1. Typography, Accents & Button Standards

### 1.1 Heading Green Full Stops
* **Enforcement:** Every primary hero headline (`h1`), section title (`h2`), and featured sub-heading (`h3`) must conclude with a styled brand green full stop.
* **Markup:** `<span class="brand-dot">.</span>` or `<span class="accent-period">.</span>`
* **Color Standard:** `#84ff2b` / `#8CFF32` (Cascaded cleanly via stylesheets, zero `!important`).
* **Rule:** No white, gray, or omitted periods at the end of primary section titles.

### 1.2 Button & CTA Uppercase Enforcement
* **Enforcement:** All interactive call-to-action (CTA) buttons, system triggers, and section action buttons must be uppercase. Hero CTA buttons must render side-by-side using `.subpage-hero-cta-row` (flexbox row) with smooth scrolling.
* **CSS Standard:**
  ```css
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
  font-size: 0.85rem - 0.95rem;
  ```
* **Examples:** `INITIALIZE CONSULTATION`, `EXPLORE MISSION DOSSIERS`, `DEPLOY SOLUTIONS`, `INITIATE CONNECTION`.

### 1.3 Breadcrumb Formatting
* **Format:** `// CORE > // PROTOCOLS > // [PAGE NAME]`
* **Style:** Monospace font, uppercase, `#subpage-wrapper .breadcrumb-text` with color `#8a9df8`, letter spacing `0.25em`, `font-size: 0.75rem`.

---

## 2. Universal Baseline Card Standard (`.baseline-card`)

All content blocks, service cards, framework steps, deep-dive panels, use-case summaries, and form containers across the entire site must strictly inherit the **Autopilot AI Active** baseline card specification:

```css
.baseline-card, .purple-glow-card, .framework-step-card, .deep-dive-panel, .glass-panel {
  background: rgba(10, 25, 47, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(138, 75, 243, 0.25);
  box-shadow: 0 0 25px rgba(138, 75, 243, 0.15);
  border-radius: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.baseline-card:hover, .purple-glow-card:hover, .framework-step-card:hover, .deep-dive-panel:hover, .glass-panel:hover {
  border-color: rgba(140, 255, 50, 0.4);
  box-shadow: 0 0 30px rgba(140, 255, 50, 0.2);
  transform: translateY(-3px);
}
```

### Card Padding & Spacing Standards
* Standard Content Cards: `padding: 2rem`
* Hero / Widget Cards: `padding: 2rem`, `max-width: 340px`
* Large Feature Panels: `padding: 2.5rem` - `3rem`

---

## 3. Spacing, Grids & Layout Architecture

### 3.1 Above-the-Fold Hero Viewport Standard (Strict Isolation)
* **Wrapper Nesting:** Every standalone page in `App.tsx` must be nested inside `<div id="subpage-wrapper" className="vertical-scroll-wrapper" ref={containerRef}>` to ensure correct layout margins and prevent duplicate padding-top offsets from `:not(#subpage-wrapper)`.
* **First Section Isolation:** The initial hero section on every subpage (`#block-hero` or `#tech-services-hero`) must occupy the **full viewport above the fold**. Use high-specificity stylesheet declarations to enforce this without inline styles or `!important`:
  ```css
  #subpage-wrapper .section.hero-fullscreen-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    width: 100%;
  }
  ```
* **Hero Grid Alignment:** The layout must use a grid structure with columns defined exactly as `grid-template-columns: 1.2fr 0.8fr` gap `3rem` to match the gold standard 1:1.
* **Hero Content Only:** The above-the-fold hero section must strictly contain only:
  1. Left Column: Breadcrumb, Headline (`h1` with green dot), Tagline badges, Body copy, and 2 CTA buttons.
  2. Right Column: Dedicated visual widget or interactive gauge card (`.baseline-card` max-width `340px` with 160px SVG).
* **Below-the-Fold Pacing:** Secondary content such as Outcome Stat grids, Service selectors, Deep Dives, and Framework cards must NEVER bleed into the initial hero viewport; they must sit cleanly in subsequent sections **below the fold**.
* **Container Max Width:** `1200px` centered with `margin: 0 auto`.
* **Section Gap:** `3rem` - `4rem` vertical breathing room between major block headers and child grids.

### 3.2 Framework & Process Layouts (Horizontal 4-Card Grid)
* All 4-step methodologies, deployment protocols, or operational frameworks must render as **4 horizontal glass cards**:
  ```css
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  ```
* **Internal Card Flow:**
  1. Step Index: `01` - `04` in green monospace (`#8CFF32`, `font-size: 0.85rem`, `font-weight: 700`)
  2. Title: White `h3` (`1.2rem`, `font-weight: 700`)
  3. Focus statement: Gray text with bold green focus label (`<strong style="color: #8CFF32">Focus:</strong>`)
  4. Bulleted deliverables: Compact list with green dot bullet markers (`•`)

### 3.3 Metric Gauges & Data Counters
* **Number Display:** Metric value positioned in the visual center of the SVG ring/container with class `count-up-trigger`.
* **Label Placement:** Descriptive label (e.g. `Operational Confidence`) must be rendered **strictly underneath** the SVG circle container (`marginTop: '0.75rem'`, `marginBottom: '1.25rem'`). **Zero text overlapping inside the gauge ring.**
* **Animation:** GSAP ScrollTrigger animating smoothly from `0%` / `0` to target value with 1-decimal precision (`99.4%`) on entry/scroll.

---

## 4. Footer & Contact Integrity

### 4.1 Subpage Contact Blocks
* The Contact section on all subpages must display the two clean cards (Left: `Initiate Engagement` form, Right: `Initialize System Engagement` copy + LinkedIn link).
* **No Redundant Links:** Do NOT render duplicate centered link rows below the contact form on subpages.

### 4.2 Universal Global Footer
* All subpages (`slug !== 'home'`) must render the universal `<GlobalFooter />` at the bottom of the page containing:
  * Left: `© 2026 Lycos Core LLC. All rights reserved.`
  * Right: `Master Knowledge Base` | `Terms of Use` | `Privacy Policy` | `Responsible AI Policy`

---

## 5. Automated QA Verification Checklist

When executing `lmstudio-qa` (Code QA) and `lmstudio-visual-qa` (Visual QA via Playwright + Gemma 3):

| Item | Requirement | Pass Condition |
| :--- | :--- | :--- |
| **QA-01** | Heading Green Dots | Every `h1` and `h2` ends with `.brand-dot` in `#84ff2b` |
| **QA-02** | Button Text Case | All buttons have uppercase text and letter spacing |
| **QA-03** | Card Styling Uniformity | All cards match `.baseline-card` background, border, and blur |
| **QA-04** | Gauge Label Position | Metric label sits cleanly underneath the gauge circle |
| **QA-05** | Count-Up Animation | Numbers count up with exact decimal precision on scroll |
| **QA-06** | Framework Card Grid | 4-step frameworks display as 4 horizontal glass cards |
| **QA-07** | Footer Cleanliness | Universal footer present; no duplicate links under contact form |
| **QA-08** | WP Obfuscation | Zero exposed WordPress footprints or `/wp-content/` paths |
