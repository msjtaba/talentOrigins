# Product Requirements Document
## Talent Origins — Corporate Website

**Version:** 1.6  
**Author:** [Your Name]  
**Date:** June 17, 2026  
**Status:** Draft  

---

## 1. Overview

### 1.1 Company Background

Talent Origins is a US-based recruitment agency specializing exclusively in non-IT verticals. The company connects employers with pre-vetted candidates across seven industry sectors: Healthcare, Manufacturing, Retail & Sales, Hospitality, Finance & Accounting, Construction & Trades, and Logistics & Supply Chain.

### 1.2 Product Summary

This document defines requirements for the Talent Origins public-facing marketing and lead-capture website. The site has two primary jobs:

1. Establish credibility and convert visitors (employers and candidates) into form submissions.
2. Route those submissions — including resume file attachments — to the internal HR recruiter's email inbox via the Resend API.

There is no database, no login system, and no admin dashboard. The backend is intentionally minimal: receive form data, attach files where applicable, and forward via email.

### 1.3 Goals

| Goal | Success Metric |
|---|---|
| Employers discover and submit hiring requests | Employer form submission rate |
| Candidates submit applications with resumes | Candidate form submission rate |
| HR recruiter receives complete, structured emails | 100% delivery rate, zero lost submissions |
| Site communicates authority in non-IT recruitment | Qualitative stakeholder approval |

---

## 2. Scope

### In Scope

- Single-page continuous-scroll website (Next.js / React)
- All content sections listed in Section 4
- Employer inquiry form
- Candidate application form with resume upload
- Resend API integration for email forwarding
- Placeholder animation intent (detailed specs maintained in a separate animation document)
- Responsive design (mobile, tablet, desktop)

### Out of Scope

- ATS (Applicant Tracking System) integration
- Candidate/employer login or dashboard
- Job board or live job listings
- Blog or CMS
- Analytics beyond basic page-level tracking (can be added post-launch)
- Multi-language support

---

## 3. Users

### 3.1 Employers

US-based hiring managers, HR leads, or business owners looking to fill non-IT roles. They arrive with a specific need (a role to fill) and want to quickly submit a request and have someone reach out to them.

**Key need:** Low-friction way to express intent to hire and get a recruiter callback/email.

### 3.2 Candidates

Job seekers in non-IT industries looking for placement assistance. They may be actively applying or passively exploring opportunities.

**Key need:** Submit a resume and cover note and trust that a human will review it.

### 3.3 HR Recruiter (Internal)

Receives all form submissions via email. Is not a user of the website itself, but is the downstream recipient of everything the site collects. All emails must be clearly structured for fast triage.

---

## 4. Page Architecture

The site is a **single continuous-scroll page** with a fixed top navigation that links to each section via smooth scroll. No page reloads. No routing between pages.

### Navigation Bar (Fixed / Sticky)

- **Logo** (left) — see Section 4.1 (Brand Assets)
- **Nav links** (right): Home · For Employers · For Candidates · Industries · Contact Us
- Each nav link performs a smooth scroll to its corresponding section (no page reload, no routing)
- Collapses to a hamburger menu on mobile (full-screen overlay, see Section 10.1)
- No separate "Get Started" CTA in the nav itself — the Home section's two CTAs handle conversion intent

---

### 4.1 Brand Assets

**Logo:** Provided. File: `talent-origins-logo.png` (transparent background, dark-theme native — navy and green wordmark with interlocking "O" icon).

**Tagline:** *"Staffing & Recruiting: Engineering the Future Workforce"* — appears beneath the logo lockup where space allows (e.g. footer), and optionally as a small subtext under the logo in the nav on desktop only (omitted on mobile nav for space).

**Usage notes:**
- The logo already has a transparent/dark background baked in — use as-is on the dark theme, no recoloring needed
- For favicon: export a cropped square version of just the icon mark (the interlocking "O") at 512×512, 192×192, and 32×32
- SVG version recommended for production if available; PNG is acceptable at the provided resolution for now

---

### Section 1 — Home (Hero)

**Purpose:** Immediately communicate what Talent Origins does. Drive action toward either form.

**Content:**
- Background: AI-generated hero image covering the full section (dark, professional, workforce/recruitment themed — no real identifiable faces per content safety guidelines; abstract or environmental imagery preferred)
- Headline: **"Building Careers. Strengthening Teams."**
- Subtext: *"Creating meaningful connections between employers and candidates that drive long-term success."*
- Two CTA buttons side by side:
  - **"Submit Resume"** → smooth-scrolls to Contact section, pre-selects the Candidate path in the conversational form
  - **"Hire Talent"** → smooth-scrolls to Contact section, pre-selects the Employer path in the conversational form

**Animation Intent:** Staged text reveal on load (Section 8.1). Hero background image is static — no parallax required unless desired later.

---

### Section 2 — Trust Bar

**Purpose:** Establish immediate credibility through a stat strip.

**Content:** Four stats, no logos:
- **500+** Placements
- **98%** Retention Rate
- **15** Industries Served
- **48 Hrs** Avg Shortlist Time

**Animation Intent:** Each stat counts up from 0 on scroll-into-view (Section 8.2).

> Note: "15 Industries Served" is the approved copy figure for this stat — distinct from the 7 named verticals featured in the Industries section (Section 6), which are the primary/featured categories. No contradiction requires resolution; this is standard marketing framing (7 featured categories representing a broader 15-industry reach).

---

### Section 3 — Why Us + Recruitment Engine (Combined)

**Purpose:** A single combined section. Differentiate Talent Origins, then immediately prove it with the process itself. These are NOT two separate sections — one headline, one flowing section, with the Recruitment Engine pipeline animation as its centerpiece.

**Content:**
- Headline: **"The Difference Is in the Process."**
- Subheadline: **"Strategic Hiring"**
- Directly beneath the headline: the **Recruitment Engine zig-zag scroll-pinned pipeline animation** (full spec in Section 8.4)
- The four pipeline steps represent the process itself, e.g.:
  - Step 1: Sourcing
  - Step 2: Vetting
  - Step 3: Alignment
  - Step 4: Onboarding
  
  *(Step labels and 1-line descriptions per step: final copy TBD — open item, see Section 12)*

**Layout:** No card-grid "Why Us" content separate from this. The pipeline animation itself, paired with the headline, carries the entire section.

**Animation Intent:** Scroll-pinned zig-zag pipeline as specified in Section 8.4 / 10.5 (mobile vertical fallback).

---

### Section 4 — For Employers

**Purpose:** Speak directly to hiring managers. Drive them toward the Contact section.

**Layout:** Two-column. **Text on the left, AI-generated image on the right** (desktop/tablet). Stacks text-above-image on mobile.

**Content:**
- Headline: **"For Employers"**
- Description: *"Building the right team starts with finding the right people. We connect you with skilled professionals who align with your goals, culture, and vision for growth."*
- CTA button: **"Hire Talent"** → smooth-scrolls to Contact section, pre-selects Employer path
- Right-side image: AI-generated, professional/workplace themed, **no human faces** (e.g. abstract office environment, hands shaking cropped at wrist, team silhouettes from behind, or abstract workforce imagery)

---

### Section 5 — For Candidates

**Purpose:** Speak directly to job seekers. Drive them toward the Contact section.

**Layout:** Two-column, **mirrored** from the Employers section. **Image on the left, text on the right** (desktop/tablet). Stacks image-above-text on mobile (or text-first — design choice at build time for visual rhythm).

**Content:**
- Headline: **"For Candidates"**
- Description: *"Your next opportunity starts here. Explore exciting positions with leading employers and discover a role where you can thrive and grow."*
- CTA button: **"Submit Resume"** → smooth-scrolls to Contact section, pre-selects Candidate path
- Left-side image: AI-generated, career/opportunity themed, **no human faces** (e.g. open road/path imagery, abstract growth/upward motifs, workspace details without people)

---

### Section 6 — Industries Served

**Purpose:** Instantly signal which verticals Talent Origins recruits for.

**Content:**
- Headline: **"Industries We Serve"**
- Description: *"Delivering recruitment solutions across diverse industries, connecting skilled professionals with leading employers."*
- The **network visualization animation** (Section 8.6) is the primary visual centerpiece of this section — the 4 nodes shown in the animation (Healthcare, Manufacturing, Logistics, Construction) represent the network concept; all 7 industry verticals are listed as supporting content (cards or a list) alongside or beneath the network graphic:
  - Healthcare
  - Manufacturing
  - Retail & Sales
  - Hospitality
  - Finance & Accounting
  - Construction & Trades
  - Logistics & Supply Chain

**Animation Intent:** Network visualization per Section 8.6 / 10.9 (responsive variants).

---

### Section 7 — Testimonials

**Purpose:** Social proof from real employers and candidates.

**Content:**
- Headline: **"Trusted by Employers and Candidates"**
- 5 testimonials (final, approved copy):

  1. **Sarah Mitchell** — Candidate
     *"TalentOrigins made my job search simple and efficient. They matched me with a role that perfectly fit my skills and career goals."*

  2. **David Carter** — Employer
     *"The quality of candidates provided by TalentOrigins exceeded our expectations. Their recruitment process saved us valuable time."*

  3. **Emily Rodriguez** — Candidate
     *"The team was supportive throughout the hiring process and kept me informed every step of the way."*

  4. **Michael Bennett** — Employer
     *"TalentOrigins understood our hiring needs and delivered strong candidates quickly. A reliable recruitment partner."*

  5. **Jessica Turner** — Candidate
     *"Professional, responsive, and genuinely invested in my success. I highly recommend TalentOrigins to job seekers."*

**Animation Intent:** Auto-scroll rail per Section 8.7 / 10.8 (2 cards desktop, 1 card mobile, pause on hover/touch).

---

### Section 8 — Contact Us

**Purpose:** Primary conversion point. Houses both forms via the conversational UI, plus quick-contact fallback info.

**Content:**
- Headline: **"Contact Us"**
- The **conversational form animation** (Section 8.5): message bubble → typed question → Candidate / Employer button choice → corresponding form expands
- This is the scroll target for all CTA buttons across the site ("Submit Resume," "Hire Talent," and nav "Contact Us")
- **CTA pre-selection behavior:** clicking "Hire Talent" anywhere on the site scrolls here AND auto-selects "Employer," skipping straight to the expanded employer form (typing animation can be skipped/shortened in this case since intent is already known). Clicking "Submit Resume" does the same for "Candidate." Clicking the nav's "Contact Us" link scrolls here with no pre-selection — the full conversational flow (typing animation, then button choice) plays normally.
- **Below the form:** quick-contact cards — two small cards side by side (stacked on mobile):
  - Email card: icon + email address *(placeholder until provided — see Section 12, Open Items)*
  - Phone card: icon + phone number *(placeholder until provided — see Section 12, Open Items)*

---

### Footer

**Purpose:** Closing brand element and legal/social info.

**Content:**
- Logo (small version) + tagline: *"Staffing & Recruiting: Engineering the Future Workforce"*
- Social media icons (placement only — specific platforms/links pending, see Section 12)
- Copyright line: © 2026 Talent Origins. All rights reserved.

---

## 5. Forms

### 5.1 Employer Inquiry Form

Located in the "For Employers" section.

| Field | Type | Required | Notes |
|---|---|---|---|
| Company Name | Text input | Yes | |
| Contact Person Name | Text input | Yes | |
| Email Address | Email input | Yes | Validated format |
| Job Title / Role | Text input | Yes | Role they're hiring for |
| Job Description | Textarea | Yes | Min ~50 chars recommended |
| Submit button | — | — | Label: "Submit Hiring Request" |

**On submit:**
- Client-side validation runs first (all required fields, valid email format)
- Loading state shown on button
- POST to `/api/contact/employer` (Next.js API route)
- On success: inline success message — "Thanks! A recruiter will be in touch within 1 business day."
- On failure: inline error message — "Something went wrong. Please try again or email us directly at [recruiter email]."

---

### 5.2 Candidate Application Form

Located in the "For Candidates" section.

| Field | Type | Required | Notes |
|---|---|---|---|
| Full Name | Text input | Yes | |
| Email Address | Email input | Yes | Validated format |
| Job Type Preference | Select / Radio | Yes | Options: Full-time, Part-time, Contract |
| LinkedIn Profile URL | URL input | No | Optional, validated as URL if provided |
| Short Cover Note | Textarea | Yes | ~100–500 chars recommended |
| Resume Upload | File input | Yes | Accepted: PDF, DOC, DOCX. Max size: 5MB |
| Submit button | — | — | Label: "Submit My Application" |

**On submit:**
- Client-side validation runs first
- File type and size validated client-side before upload
- POST to `/api/contact/candidate` (Next.js API route) as `multipart/form-data`
- On success: inline success message — "Application received! We'll review your resume and reach out soon."
- On failure: inline error message with fallback email

---

## 6. Backend & Email Integration

### 6.1 Architecture Overview

```
User (browser)
    │
    ▼
Next.js App (Vercel)
    │
    ├── /api/contact/employer    → Resend API → HR Recruiter inbox
    └── /api/contact/candidate   → Resend API → HR Recruiter inbox
                                   (resume attached as file)
```

No database. No persistence. Submissions exist only in the recruiter's email inbox.

---

### 6.2 API Routes

#### `POST /api/contact/employer`

**Request body (JSON):**
```json
{
  "companyName": "string",
  "contactName": "string",
  "email": "string",
  "jobTitle": "string",
  "jobDescription": "string"
}
```

**Action:** Sends a formatted email to the HR recruiter via Resend.

**Email format sent to recruiter:**
```
Subject: [New Employer Inquiry] {jobTitle} — {companyName}

Company: {companyName}
Contact: {contactName}
Email: {email}
Role: {jobTitle}

Job Description:
{jobDescription}

---
Submitted via Talent Origins website
```

---

#### `POST /api/contact/candidate`

**Request:** `multipart/form-data`

**Fields:**
```
fullName, email, jobTypePreference, linkedinUrl (optional), coverNote, resume (file)
```

**Action:** Sends a formatted email to the HR recruiter with the resume attached.

**Email format sent to recruiter:**
```
Subject: [New Candidate Application] {fullName} — {jobTypePreference}

Name: {fullName}
Email: {email}
Job Type: {jobTypePreference}
LinkedIn: {linkedinUrl or "Not provided"}

Cover Note:
{coverNote}

Resume: [attached]

---
Submitted via Talent Origins website
```

---

### 6.3 Resend Configuration

- Library: `resend` npm package
- API key stored in environment variable: `RESEND_API_KEY`
- Domain: `talentorigins.com` (must be verified in the Resend dashboard via DNS records before sending will work)
- Sender address: `mohd.muttalib24@talentorigins.com` (stored in env var `RESEND_FROM_EMAIL`) — this address must belong to a domain verified in Resend
- Recipient: `info@torigins.com` (stored in env var `RECRUITER_EMAIL`)
- Resume files for candidate submissions: passed as `attachments` array in Resend's send call

> ⚠️ **Domain mismatch flagged:** the sender address is on `talentorigins.com`, but the recipient address is on `torigins.com` — a different domain. This is not an error in this document; it's reproduced exactly as provided. If `torigins.com` was meant to be `talentorigins.com`, confirm and correct before launch — emails will still deliver correctly to `info@torigins.com` as long as that mailbox exists and is actively checked, regardless of domain name match.

**Environment variables required:**
```
RESEND_API_KEY=
RESEND_FROM_EMAIL=mohd.muttalib24@talentorigins.com
RECRUITER_EMAIL=info@torigins.com
NEXT_PUBLIC_SITE_URL=https://talentorigins.com
```

**Security rules — strictly enforced:**

- `RESEND_API_KEY` must **never** have the `NEXT_PUBLIC_` prefix. Adding that prefix would bundle it into the client-side JavaScript bundle and expose it to anyone who opens browser DevTools. It must remain a server-only variable.
- The Resend SDK (`resend.emails.send(...)`) must only be called inside Next.js API routes (`/app/api/` or `/pages/api/`), never inside a React component, a client component, or any file marked `"use client"`.
- The browser never communicates with Resend directly. The only allowed data flow is: `Browser → /api/contact/* (Next.js server) → Resend API`.
- On Vercel, environment variables are set in the project dashboard under Settings → Environment Variables. They are never committed to the repository. The `.env.local` file (for local dev) must be listed in `.gitignore` — this should be verified before the first `git push`.
- The `.env.example` file committed to the repo contains only the variable **names** with empty values, never the actual keys:
```
# .env.example — safe to commit, contains no real values
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RECRUITER_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

**Rate limiting (recommended post-launch):**

API routes should be protected against form spam. Recommended approach: Vercel's built-in request limits handle basic abuse, but for additional protection, add `upstash/ratelimit` (free tier available) to limit submissions to e.g. 5 requests per IP per 10 minutes. This also protects against anyone burning through your Resend email quota maliciously.

---

### 6.4 File Handling (Resume Upload)

- Accepted MIME types: `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- Max file size: 5MB (enforced client-side and server-side)
- Files are **not stored** anywhere — they are streamed from the request body directly into the Resend attachment payload and discarded
- No S3 bucket, no disk writes, no persistence

---


## 7. Visual Design

### 7.1 Design Direction

**Tone:** Bold & Modern  
**Palette:** Dark backgrounds with strong accent colors anchored to `#06714B` (deep emerald green) and its shade family.

| Role | Value | Usage |
|---|---|---|
| Background (primary) | `#0A0F0D` | Page background, section backgrounds |
| Background (elevated) | `#111814` | Cards, form surfaces |
| Accent (primary) | `#06714B` | CTAs, active states, highlights |
| Accent (light) | `#2E9C72` | Hover states, secondary accents |
| Accent (muted) | `#0C3D2A` | Borders, dividers, subtle tints |
| Text (primary) | `#F0F5F2` | Headlines, body |
| Text (muted) | `#88A89A` | Labels, captions, placeholders |

### 7.2 Typography

- **Display / Headlines:** A high-impact sans-serif with wide tracking — e.g., *Syne*, *Space Grotesk*, or *Outfit* (Google Fonts, free). Used for section headings and hero headline.
- **Body:** Clean, readable sans-serif — e.g., *Inter* or *DM Sans*.
- **Type scale:** Hero H1 (~56–72px), Section H2 (~36–44px), Card H3 (~20–24px), Body (~16px), Caption (~13px).

### 7.3 Component Style

- Border radius: `8px` for cards, `6px` for inputs, `4px` for buttons
- Buttons: filled accent color for primary CTAs, outlined (`border: 1px solid #06714B`) for secondary
- Form inputs: dark surface (`#111814`), `1px` border (`#0C3D2A`), focus ring in `#06714B`
- Cards: subtle `1px` border in `#0C3D2A`, slight box shadow, no heavy drop shadows
- No gradients as primary backgrounds — accent color used as text highlight or button fill, not background wash

---


## 8. Animation Specifications

### 8.0 General Rules

- All scroll-triggered animations fire **once** on first entry into viewport, not on re-scroll
- All animations must respect `prefers-reduced-motion: reduce` — fall back to instant visibility
- Implementation library: **Framer Motion** (scroll-triggered variants) + **CSS** for continuous loops
- No animation on form inputs themselves — forms must feel stable and trustworthy

---

### 8.1 Hero — Staged Text Reveal

On page load (no scroll trigger):
- Headline words/lines animate in sequentially with a fast stagger (e.g. 80ms apart), slight upward translate + fade
- Subheadline fades in after headline settles (~300ms delay)
- Both CTA buttons fade up together after subheadline

---

### 8.2 Trust Bar — Counting Stats

On scroll-into-view:
- Numeric stats count up from `0` to their final value over ~1.2s using an easing curve
- Logos (if present) fade in left to right with a short stagger

---

### 8.3 Why Us + Recruitment Engine — Section Intro Reveal

On scroll-into-view (before the pipeline animation in 8.4 takes over via scroll-pin):
- Headline **"The Difference Is in the Process."** and subheadline **"Strategic Hiring"** fade in and translate upward together
- No separate card grid — this section flows directly into the pipeline animation below

---

### 8.4 Recruitment Engine — Zig-Zag Scroll Pipeline

This section is **scroll-pinned** — the page pauses scrolling while the pipeline builds, then releases.

The four steps are arranged in a zig-zag layout:

```
[ STEP 1 ] ───────────► [ STEP 2 ]
                             │
                             ▼
[ STEP 4 ] ◄─────────── [ STEP 3 ]
```

**Sequence (driven by scroll progress while pinned):**

1. Step 1 card fades in and activates
2. A horizontal connector line draws live from Step 1 → Step 2 (SVG `stroke-dashoffset` or Framer Motion `pathLength`). A small particle travels the line as it draws
3. Step 2 card emerges at the line endpoint and activates
4. A vertical connector draws downward from Step 2 → Step 3 row, with traveling particle
5. Step 3 card activates
6. A horizontal connector draws right to left from Step 3 → Step 4, with traveling particle
7. Step 4 card activates

**States:**
- **Active step:** elevated glow, prominent content reveal
- **Completed step:** remains visible, slightly reduced emphasis
- Connector lines remain visible once drawn

**Implementation note:** Use `ScrollTrigger` (GSAP) or Framer Motion `useScroll` + `useTransform` to map scroll position to `pathLength`. Pin the section using `position: sticky` or GSAP `pin: true`.

---

### 8.5 Forms Section — Conversational UI Animation

The Employer and Candidate forms are presented as a **chat-like conversation**, not a static form block.

**On scroll-into-view:**

1. A message bubble appears with fade-in + slide-up
2. Inside the bubble, the question **"Are you a Candidate or an Employer?"** types out character by character (~40ms per character) — typing begins only after the bubble is visible
3. Once typing completes, two buttons appear beneath the bubble with a gentle fade-up: **"Candidate"** · **"Employer"**

**On selection:**

- Selected button becomes visually highlighted (accent fill)
- The corresponding form expands smoothly beneath via height animation (`max-height` transition or Framer Motion `AnimatePresence` + `initial={{ height: 0 }}`)
- If the user switches selection, the open form collapses and the new one expands

**No animation inside the form fields themselves.** Only the container expand/collapse animates.

---

### 8.6 Hero / Industries Section — Network Visualization

A **living network graphic** positioned in the Hero or a dedicated section that acts as a visual metaphor for Talent Origins as the central workforce hub.

**Layout:**
- Central node: **Talent Origins** (largest, fixed, ambient glow)
- 4 surrounding industry nodes connected to center: Healthcare (top), Manufacturing (right), Logistics (bottom), Construction (left)

**Ambient motion:**
- Nodes drift ±3–5px over ~4s cycles (sine easing), giving a gentle "breathing" feel
- Connection lines flex with node movement

**Particle flow:**
- Small glowing particles travel continuously along connector lines from center outward
- Occasional reverse-direction particles (inward) suggest two-way flow
- Particle speed varies slightly per line for a natural, non-mechanical feel

**Data pulse:**
- At staggered intervals, a larger glowing pulse travels from the center hub along a connection, brightens the line as it passes, then fades at the destination node

**Hover interaction (on industry node):**
- Hovered node enlarges and brightens
- Its connector line brightens and particle frequency increases
- Non-hovered nodes and lines reduce opacity slightly, keeping the hovered path as focal point
- Transition is smooth (~200ms)

**Implementation:** Canvas (`<canvas>`) or SVG with `requestAnimationFrame`. React wrapper component with cleanup on unmount.

---

### 8.7 Testimonials — Auto-Scroll Rail

- Displays **2 cards visible** at a time in a horizontal rail
- Auto-scrolls continuously and smoothly (CSS `animation: scroll linear infinite` or JS-driven)
- Cards loop seamlessly — duplicate set appended for infinite illusion
- **Pauses on hover** (`animation-play-state: paused`)
- No manual prev/next controls needed

---

### 8.8 Global UI Components — DotField & BorderGlow

Two reusable components apply **site-wide**, layered underneath/around the content described in Sections 8.1–8.7. These are sourced from the `react-bits` component registry via shadcn CLI.

#### 8.8.1 DotField — Global Background

**What it is:** A canvas-rendered dot grid covering a container, where dots bulge away from the cursor on hover, with a soft radial glow trailing the pointer. Pure visual ambience layer — sits behind all page content.

**Install:**
```bash
npx shadcn@latest add @react-bits/DotField-JS-CSS
```

**Scope of use:** Applied as the **base background layer for the entire single-scroll page** — one `DotField` instance sized to the full page (or per-section instances if performance requires splitting it up; see mobile note below). It sits behind every section (Hero through Footer), giving the whole site a consistent living-background feel rather than being a one-off effect on a single section.

**Brand-mapped configuration** (replacing the example purple/pink defaults with the established palette — Section 7.1):

```jsx
<DotField
  dotRadius={1.5}
  dotSpacing={14}
  bulgeStrength={67}
  glowRadius={160}
  sparkle={false}
  waveAmplitude={0}
  cursorRadius={500}
  cursorForce={0.1}
  bulgeOnly
  gradientFrom="rgba(6, 113, 75, 0.35)"     // accent primary #06714B at 35% opacity
  gradientTo="rgba(46, 156, 114, 0.20)"      // accent light #2E9C72 at 20% opacity
  glowColor="#0A0F0D"                         // matches background primary token
/>
```

**Placement notes:**
- Container: `position: relative` wrapper around the entire page, with `DotField` absolutely positioned to fill it (`inset: 0`), `z-index: 0`, and all real content sitting at `z-index: 1` or higher above it
- The dot grid should read as a **subtle texture**, not a distraction — the green gradient tokens above are intentionally low-opacity (20–35%) so it doesn't compete with section content or the network visualization in Section 8.6
- Do **not** stack a second independent `DotField` instance behind the Network Visualization (Section 8.6) — that section already has its own animated graphic; the global DotField passing behind it is sufficient and avoids visual clutter

**Mobile/performance handling:**
- `DotField` is a continuous `requestAnimationFrame` canvas loop — same battery/perf class of concern as the Network Visualization (Section 8.6 / 10.9)
- **Mobile (`< 768px`):** disable cursor-reactive behavior entirely (no `mousemove` listener — touch devices don't have a persistent cursor anyway) and render the dot grid in a **static, non-animated** state, or reduce `dotSpacing` density and disable the `tick()` RAF loop, falling back to a single static canvas paint on resize only
- **Tablet/Desktop:** full interactive behavior as configured above
- Respect `prefers-reduced-motion: reduce` — when set, skip the bulge/glow interpolation entirely and render dots in their resting (`ax, ay`) position with no animation loop running

---

#### 8.8.2 BorderGlow — Card & Container Hover Treatment

**What it is:** A wrapper component that adds an animated, mesh-gradient glow that traces a card's border, intensifying near wherever the cursor is along the edge. Use for elevated containers that benefit from a premium, reactive feel on hover.

**Install:**
```bash
npx shadcn@latest add @react-bits/BorderGlow-JS-CSS
```

**Scope of use — applied to:**
- **Why Us + Recruitment Engine** (Section 3 / 8.4): each of the 4 pipeline step cards, glow active when that step is in its "active" state and on hover/tap
- **Industries Served** (Section 6): each of the 7 industry cards
- **Testimonials** (Section 7 / 8.7): each testimonial card in the auto-scroll rail
- **Trust Bar** (Section 2): optional — each stat block, if a card treatment is used rather than a plain stat strip
- **Not applied to:** form containers (Section 8 / 8.5) — forms should stay visually calm and trustworthy, consistent with the "no animation on form inputs" rule in Section 8.0; the conversational message bubble and CTA buttons stay plain

**Brand-mapped configuration:**

```jsx
<BorderGlow
  edgeSensitivity={30}
  glowColor="158 80 35"          // HSL mapped to accent primary #06714B family
  backgroundColor="#111814"       // matches "Background (elevated)" token, Section 7.1
  borderRadius={8}                // matches card border-radius token, Section 7.3
  glowRadius={32}
  glowIntensity={1}
  coneSpread={25}
  animated={false}
  colors={['#06714B', '#2E9C72', '#0C3D2A']}  // accent primary, accent light, accent muted
  fillOpacity={0.4}
>
  {/* card content */}
</BorderGlow>
```

**Notes:**
- `glowColor` and `colors` are remapped from the component's example purple/pink/cyan defaults to the Talent Origins accent family (`#06714B` / `#2E9C72` / `#0C3D2A`) so the effect feels native to the brand rather than borrowed
- `borderRadius={8}` matches the existing card radius token from Section 7.3 — don't let this component introduce a competing radius value
- `animated={true}` (the auto-sweep entrance effect) can optionally be used **once** on the active pipeline step card in the Recruitment Engine animation (Section 8.4) as it activates, to reinforce the "this step just lit up" moment — leave `animated={false}` (hover-only) everywhere else
- On touch devices, `onPointerMove` still fires on tap/drag, so the effect degrades gracefully to a tap-triggered glow rather than requiring true hover

---

## 9. Technical Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14+ (App Router) | React server components where applicable |
| Language | TypeScript | Strict mode recommended |
| Styling | Tailwind CSS | Utility-first, with custom color tokens matching palette |
| Animation | Framer Motion + GSAP (ScrollTrigger) | Framer Motion for entrance/reveal; GSAP for scroll-pinned pipeline |
| Network Visual | Canvas API or SVG + rAF | Living network node visualization |
| Global Background | `DotField` (react-bits, via shadcn CLI) | Site-wide cursor-reactive dot grid, brand-mapped colors (Section 8.8.1) |
| Card Hover Effect | `BorderGlow` (react-bits, via shadcn CLI) | Applied to pipeline, industry, and testimonial cards (Section 8.8.2) |
| Carousel | CSS infinite scroll or Embla Carousel | For testimonials auto-scroll rail |
| Email | Resend (`resend` npm package) | Via Next.js API routes |
| File parsing | `formidable` or native `FormData` | For multipart candidate form |
| Hosting | Vercel | Native Next.js support, env var management, serverless functions |
| Domain | `talentorigins.com` | Must be verified in Resend for sending |

---

## 10. Responsive Design

### 10.0 Breakpoint System

| Token | Range | Description |
|---|---|---|
| `mobile` | `< 768px` | Single-column, touch-first |
| `tablet` | `768px – 1023px` | Two-column where applicable |
| `desktop` | `≥ 1024px` | Full layout, max-width `1280px` centered |

All breakpoints implemented via Tailwind’s `sm:` / `md:` / `lg:` prefixes. Base styles target mobile first.

---

### 10.1 Navigation

| Breakpoint | Behavior |
|---|---|
| Mobile | Logo left, hamburger icon right. Tapping opens a full-screen overlay with nav links stacked vertically. “Get Started” CTA at bottom of overlay. |
| Tablet | Hamburger nav or condensed horizontal nav if space permits. |
| Desktop | Full horizontal nav — logo left, links + CTA right. Sticky on scroll. |

---

### 10.2 Hero Section

| Breakpoint | Behavior |
|---|---|
| Mobile | H1 scales to ~36–40px. CTAs stack vertically (full-width buttons). Network visualization hidden — replaced by static SVG background (see 10.9). |
| Tablet | H1 ~48px. CTAs side by side. Network shown at reduced size. |
| Desktop | Full layout. H1 56–72px. Network visualization fully interactive. |

---

### 10.3 Trust Bar

| Breakpoint | Behavior |
|---|---|
| Mobile | Stats in 2-column grid. Logos scroll horizontally if present. |
| Tablet | Single row, 3–4 columns. |
| Desktop | Full single row. |

---

### 10.4 Why Us + Recruitment Engine (Combined Section Header)

| Breakpoint | Behavior |
|---|---|
| Mobile | Headline and subheadline center-aligned, reduced font size per Section 10.10. Pipeline animation switches to vertical layout — see 10.5. |
| Tablet | Headline/subheadline as desktop, slightly reduced size. |
| Desktop | Full size headline/subheadline above the zig-zag pipeline. |

---

### 10.5 Recruitment Engine (Pipeline)

| Breakpoint | Behavior |
|---|---|
| Mobile | **Zig-zag layout replaced with a vertical linear flow.** Steps stack top to bottom. Connector lines draw downward. Scroll-pin behavior retained. Particles travel vertically. |
| Tablet | Zig-zag if viewport ≥ 900px wide; otherwise vertical fallback. |
| Desktop | Full zig-zag layout as specified in Section 8.4. |

**Mobile vertical layout:**
```
[ STEP 1 ]
    │
    ▼
[ STEP 2 ]
    │
    ▼
[ STEP 3 ]
    │
    ▼
[ STEP 4 ]
```

---

### 10.6 Forms Section (Conversational UI)

| Breakpoint | Behavior |
|---|---|
| Mobile | Message bubble full width. Typing animation plays as normal. Buttons stack vertically. All form fields full width. On input focus, active field scrolls into view above the soft keyboard (`scrollIntoView`). |
| Tablet | Bubble and form constrained to ~600px centered. |
| Desktop | Bubble and form constrained to ~560px centered. |

**Touch note:** File upload on mobile uses the native file picker — no drag-and-drop. Drop zone label changes to “Tap to upload your resume” on touch devices (detect via `pointer: coarse` media query).

---

### 10.7 Industries Served

| Breakpoint | Behavior |
|---|---|
| Mobile | 2-column grid of industry cards. |
| Tablet | 3–4 column grid. |
| Desktop | 4-column or 7-card single row. |

---

### 10.8 Testimonials Rail

| Breakpoint | Behavior |
|---|---|
| Mobile | **1 card visible** (not 2). Auto-scroll continues. Pause-on-hover becomes pause-on-touch (`touchstart` / `touchend` listeners). Cards full viewport width. |
| Tablet | 1–2 cards visible. |
| Desktop | 2 cards visible as specified. |

---

### 10.9 Network Visualization — Mobile Strategy

The full Canvas network (drift, particles, pulses, hover) is **not rendered on mobile** due to battery and touch constraints.

| Breakpoint | Version Rendered |
|---|---|
| Mobile (`< 768px`) | `<NetworkStatic />` — static SVG, same node layout and palette, no animation |
| Tablet (`768–1023px`) | `<NetworkReduced />` — Canvas, particles at 50% frequency, no ambient drift, tap-to-highlight replaces hover |
| Desktop (`≥ 1024px`) | `<NetworkFull />` — full interactive Canvas as specified in Section 8.6 |

**Implementation pattern:**
```tsx
const isMobile = useMediaQuery('(max-width: 767px)')
const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')

if (isMobile) return <NetworkStatic />
if (isTablet) return <NetworkReduced />
return <NetworkFull />
```

---

### 10.10 Global Components (DotField & BorderGlow) — Mobile Strategy

| Component | Mobile (`< 768px`) | Tablet (`768–1023px`) | Desktop (`≥ 1024px`) |
|---|---|---|---|
| **DotField** (background) | Static render, no `mousemove` listener, no RAF loop — single paint on load/resize only | Full interactive behavior, standard config | Full interactive behavior, standard config |
| **BorderGlow** (cards) | Tap-triggered glow via `onPointerMove` (fires on touch/drag) — no hover state needed | Full hover/tap behavior | Full hover behavior |

Both components additionally respect `prefers-reduced-motion: reduce` at every breakpoint — see Section 8.8.1 and 8.8.2 for full detail.

---

### 10.11 Typography Scale (Responsive)

| Element | Mobile | Tablet | Desktop |
|---|---|---|---|
| H1 (Hero) | 36–40px | 48px | 56–72px |
| H2 (Section) | 28px | 34px | 36–44px |
| H3 (Card) | 18px | 20px | 20–24px |
| Body | 15px | 16px | 16px |
| Caption | 12px | 13px | 13px |

---

### 10.12 Spacing & Layout

- Section vertical padding: `80px` desktop → `56px` tablet → `40px` mobile
- Max content width: `1280px` on desktop, full-width with `16px` side padding on mobile
- No horizontal scroll at any breakpoint — `overflow-x: hidden` on `<body>`

---

### 10.13 Touch & Interaction

| Concern | Handling |

|---|---|
| Tap targets | Minimum `44×44px` for all interactive elements (WCAG 2.5.5) |
| Hover states | All hover effects have equivalent `:active` / `focus-visible` states for touch |
| Form keyboard | `inputMode` attributes set per field type (e.g. `inputMode="email"` on email fields) |
| File upload | Native picker on mobile; drag-and-drop on desktop only |
| Autofill | All fields use correct `autocomplete` attributes |

---

## 11. Non-Functional Requirements

- **Performance:** Lighthouse score ≥ 85 on mobile. Images (if any) served as WebP. Fonts loaded via `next/font`.
- **Accessibility:** WCAG 2.1 AA baseline. All form fields have associated labels. Focus states visible. Color contrast ratios met.
- **SEO:** Basic meta tags (title, description, OG tags). No dynamic routing needed — single page.
- **Security:** API routes validate all inputs server-side. File type and size validated on server regardless of client-side check. `RESEND_API_KEY` never exposed to the client bundle.
- **Error handling:** All API routes return structured JSON responses. Client displays human-readable error messages.

---

## 12. Open Items

| # | Item | Owner | Status |
|---|---|---|---|
| 1 | Final copy / headline text for all sections | Talent Origins | ✅ Resolved — see Section 4 |
| 2 | Testimonial quotes | Talent Origins | ✅ Resolved — see Section 4, Section 7 |
| 3 | Client / partner logos for trust bar | Talent Origins | ✅ Resolved — no logos, stats only |
| 4 | Recruiter/recipient email address (`RECRUITER_EMAIL`) | Talent Origins | ✅ Resolved — `info@torigins.com`, see Section 6.3 |
| 5 | Domain name + Resend sender address | Talent Origins | ✅ Resolved — domain `talentorigins.com`, sender `mohd.muttalib24@talentorigins.com`, see Section 6.3 (⚠️ domain mismatch with recipient flagged — see note in 6.3) |
| 6 | Animation specs document | Developer | ✅ Resolved — fully integrated in Section 8 |
| 7 | Final brand logo files | Talent Origins | ✅ Resolved — `talent-origins-logo.png` provided |
| 8 | AI-generated hero image (Home section background) | Developer | Pending — generate per Section 4, Section 1 brief (no faces) |
| 9 | AI-generated image — For Employers section (right side) | Developer | Pending — no faces, per Section 4 |
| 10 | AI-generated image — For Candidates section (left side) | Developer | Pending — no faces, per Section 4 |
| 11 | Contact phone number | Talent Origins | Pending — to be added later |
| 12 | Social media links for footer (which platforms, URLs) | Talent Origins | Pending |
| 13 | Pipeline step labels for Recruitment Engine (Section 3) | Talent Origins | Pending — placeholder labels (Sourcing/Vetting/Alignment/Onboarding) in use, final copy TBD |
| 14 | Industry card icons (Section 6) | Developer | Pending — to be sourced or designed |
| 15 | Favicon export (square crop of logo icon) | Developer | Pending — see Section 4.1 |
| 16 | Color palette | Talent Origins | ✅ Resolved — `#06714B` emerald green family, see Section 7.1 |


**Hard blockers for launch:** Items 4 and 5 (recruiter email + domain/Resend sender) — without these the contact forms cannot send email. Everything else can ship with reasonable placeholders and be swapped in post-launch.

**Reference component source files:** Brand-mapped versions of `DotField.jsx`/`.css` and `BorderGlow.jsx`/`.css` (Section 8.8) are saved alongside this PRD in `/components/` for direct drop-in use — colors and tokens already remapped from the original example defaults to the Talent Origins palette.

---

## 13. Deliverables Checklist

**Core**
- [ ] Next.js project scaffold with TypeScript + Tailwind
- [ ] All 8 sections + footer implemented and content-accurate
- [ ] Employer form with server-side validation and Resend integration
- [ ] Candidate form with resume upload and Resend attachment
- [ ] Environment variables documented in `.env.example`
- [ ] Vercel deployment configured
- [ ] README with local dev setup instructions

**Responsive**
- [ ] Mobile hamburger nav with full-screen overlay
- [ ] All sections verified at 375px, 768px, 1280px viewports
- [ ] Recruitment Engine: zig-zag on desktop, vertical stack on mobile
- [ ] Network visualization: `NetworkFull` / `NetworkReduced` / `NetworkStatic` components
- [ ] Testimonials: 1 card on mobile, 2 on desktop
- [ ] File upload: drag-and-drop on desktop, native picker on mobile
- [ ] All tap targets ≥ 44×44px
- [ ] No horizontal scroll at any breakpoint

**Animation**
- [ ] Hero staged text reveal
- [ ] Trust bar counting stats
- [ ] Why Us + Recruitment Engine intro reveal (combined section)
- [ ] Recruitment Engine scroll-pinned zig-zag pipeline (GSAP ScrollTrigger)
- [ ] Conversational form typing animation + conditional expand/collapse
- [ ] Network Canvas visualization (full, reduced, static variants)
- [ ] Testimonials infinite auto-scroll rail, pause on hover/touch
- [ ] DotField global background installed and brand-color-mapped (Section 8.8.1)
- [ ] DotField mobile fallback (static, no RAF loop) implemented
- [ ] BorderGlow applied to pipeline, industry, and testimonial cards (Section 8.8.2)
- [ ] BorderGlow color tokens mapped to brand accent palette, not example defaults
- [ ] `prefers-reduced-motion` respected on all animations, including DotField and BorderGlow

---

*Document maintained by the developer. Updates should be versioned and dated.*