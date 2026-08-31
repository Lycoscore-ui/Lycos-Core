

1. ProtocolKinetic.tsx
   - Add App.tsx wrapper with id="subpage-wrapper" className="vertical-scroll-wrapper"
   - Hero section: 
     - Left column: breadcrumb, h1 with .brand-dot, 3 pill tags, body copy, 2 CTA buttons
     - Right column: .baseline-card with SVG ring gauge
   - Below-fold sections: use .glass-panel cards, .eyebrow-tagline labels, .service-heading h3
   - Contact section: id="contact" with 2-column layout
   - Replace inline styles with CSS classes:
     - fontSize → text-sm, text-base, etc.
     - fontWeight → font-semibold, font-bold
     - color → var(--text-primary), var(--text-secondary)
     - fontFamily → font-title
     - letterSpacing → tracking-tight, tracking-wide
     - display: flex → flex
     - gap → space-x-4, space-x-8
   - Add new CSS classes to index.css under #subpage-wrapper:
     - .hero-fullscreen-section
     - .baseline-card
     - .glass-panel
     - .eyebrow-tagline
     - .service-heading

2. ProtocolApex.tsx
   - Same structure as ProtocolKinetic.tsx but with content specific to Series A/Growth
   - Replace inline styles similarly using the same class mapping
   - Add any additional CSS classes needed for unique elements in this page
   - Ensure all below-fold sections follow .glass-panel, .eyebrow-tagline, .service-heading

3. ProtocolCitadel.tsx
   - Same structure as above but tailored for Enterprise/Corporate content
   - Replace inline styles with appropriate class names
   - Add any necessary new CSS classes to index.css under #subpage-wrapper
   - Ensure contact section matches the 2-column layout and id="contact"

4. Common CSS additions to index.css:
   - .vertical-scroll-wrapper { overflow-y: auto; }
   - .hero-fullscreen-section { height: 100vh; display: grid; grid-template-columns: 1fr 300px; }
   - .baseline-card { background: var(--card-bg); padding: var(--card-padding); }
   - .glass-panel { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); }
   - .eyebrow-tagline { font-size: 0.75rem; color: var(--text-gray); }
   - .service-heading { font-family: var(--font-title); font-weight: 800; }

5. Verify all inline styles are removed and replaced with CSS classes
6. Ensure all pages follow the same structure and styling conventions
7. Test responsiveness across different screen sizes
8. Validate that all new CSS classes are properly scoped under #subpage-wrapper