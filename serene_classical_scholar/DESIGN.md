---
name: Serene Classical Scholar
colors:
  surface: '#fff8f8'
  surface-dim: '#e1d8d9'
  surface-bright: '#fff8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf1f2'
  surface-container: '#f5eced'
  surface-container-high: '#efe6e7'
  surface-container-highest: '#e9e0e1'
  on-surface: '#1e1b1c'
  on-surface-variant: '#404945'
  inverse-surface: '#342f30'
  inverse-on-surface: '#f8efef'
  outline: '#707974'
  outline-variant: '#c0c9c3'
  surface-tint: '#376757'
  primary: '#003629'
  on-primary: '#ffffff'
  primary-container: '#1b4d3e'
  on-primary-container: '#8abda9'
  inverse-primary: '#9ed1bd'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#402b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#594113'
  on-tertiary-container: '#d0ae75'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#baeed9'
  primary-fixed-dim: '#9ed1bd'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#1d4f40'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#ffdeaa'
  tertiary-fixed-dim: '#e5c187'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5b4314'
  background: '#fff8f8'
  on-background: '#1e1b1c'
  surface-variant: '#e9e0e1'
typography:
  display-hero:
    fontFamily: Noto Serif
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  arabic-display:
    fontFamily: Amiri
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 72px
  arabic-display-mobile:
    fontFamily: Amiri
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 58px
  arabic-body-lg:
    fontFamily: Amiri
    fontSize: 26px
    fontWeight: '400'
    lineHeight: 64px
  arabic-body:
    fontFamily: Amiri
    fontSize: 22px
    fontWeight: '400'
    lineHeight: 56px
  arabic-body-scheherazade:
    fontFamily: Scheherazade New
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 60px
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Noto Serif
    fontSize: 19px
    fontWeight: '600'
    lineHeight: 28px
  body-reading:
    fontFamily: Source Serif 4
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 30px
  body-sm:
    fontFamily: Source Serif 4
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  ui-label:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.03em
  ui-caption:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4.5rem
  reading-column-max: 46rem
  reader-gutter-mobile: 1.25rem
  reader-gutter-tablet: 2.5rem
  reader-gutter-desktop: 4rem
---

## Brand & Style
This design system crafts a focused, tranquil, and scholarly sanctuary tailored for intensive reading and recitation of classical Islamic literature, tafsir, and Arabic texts. Blending the timeless authority of classical manuscript traditions with the fluid responsiveness of a modern progressive web application (PWA), the aesthetic establishes a quiet, contemplative atmosphere.

Key emotional anchors:
- **Serenity & Reverence**: Undistracted, respectful reading environments honoring scripture and classical commentary.
- **Scholarly Authority**: Balanced layout grids, refined typographic rules honoring Arabic diacritics (*harakat/tashkeel*), and tactile manuscript undertones.
- **Endurance & Clarity**: High-legibility surfaces engineered for deep, fatigue-free reading sessions across daytime, sepia parchment, and night modes.

The visual direction marries **Minimalist Editorial** with **Tactile Manuscript Influences**. It relies on warm, unadorned surfaces, delicate warm-toned division rules, refined micro-elevations, and uncluttered utility toolbars that recede completely during active reading.

## Colors
The color architecture supports three distinct ambient reading modalities designed to minimize eye strain and honor parchment-era aesthetics:

### Reading Modes
- **Light (Parchment White)**:
  - Surface Default: `#FDFBF7` (Soft, non-glare warm ivory)
  - Surface Subdued: `#F5EFEB`
  - Text Primary: `#1C1917`
  - Text Muted: `#665C54`
  - Border Subtle: `#E8DEC8`
- **Sepia (Classic Manuscript)**:
  - Surface Default: `#F4ECD8` (Rich antique vellum)
  - Surface Subdued: `#E8DEC2`
  - Text Primary: `#433422`
  - Text Muted: `#755F43`
  - Border Subtle: `#D9CCA9`
- **Dark (Midnight Mushaf)**:
  - Surface Default: `#12161A` (Deep slate obsidian)
  - Surface Subdued: `#1A2026`
  - Text Primary: `#EDE8DF`
  - Text Muted: `#9BA3AF`
  - Border Subtle: `#27313A`

### Accent Palette
- **Primary Accent (`#1B4D3E`)**: Serene Emerald Forest. Evokes garden sanctuaries and traditional bookcloth bindings. In dark mode, shifts to vibrant jade (`#34A37C`) for contrast.
- **Secondary Accent (`#C5A059`)**: Muted Illumination Gold. Applied to chapter header decorations, active bookmark badges, *juz* indicators, and surah dividers.
- **Status & Offline Indication**:
  - Offline Ready: Emerald `#1B4D3E` on soft sage tint `#E8F3EE`
  - Cached/Syncing: Amber `#B45309` on `#FEF3C7`
  - Error: Madder Rose `#9E2A2B` on `#FBEBEB`

## Typography
Typographic precision is paramount for Arabic scripture and academic treatises. Arabic typography requires dedicated vertical headroom to accommodate multi-tiered glyph accents (*shaddah*, *tanwin*, *fathah*, *kasrah*, *dammah*, and Quranic pause marks) without clipping.

### Font Hierarchy & Roles
- **Arabic Body & Scripture**: `Amiri` and `Scheherazade New`. Amiri serves as the primary classical Naskh face for dense scholastic volumes; Scheherazade New serves as the fluid alternative optimized for continuous Quranic recitation. Arabic text must maintain a line-height ratio between **2.4x and 2.6x** the font size.
- **Latin Headings & Book Titles**: `Noto Serif`. Provides classic dignity, high x-height, and rhythmic harmony beside Arabic typography.
- **Latin Body Translations & Commentary**: `Source Serif 4`. Highly legible under sustained reading, offering distinct italic styles for transliterated terms.
- **Reader UI & Metadata Controls**: `Manrope`. Clean geometric numerals and labels for verse counts, page indicators, indexing, and navigation drawer buttons.

### Bi-Directional (BiDi) Rules
- Reading panels switch to `dir="rtl"` with explicit text-align start (`right`), while translation side-by-side or footnote panes adapt dynamically to `dir="ltr"` (`left`).
- Arabic numerals (*Eastern Arabic digits* `٠١٢٣٤٥٦٧٨٩`) are applied when an Arabic-only display context is toggled in reader preferences.

## Layout & Spacing
The layout adheres to a fixed-width, editorial reading column centered horizontally on wide screens, prioritizing ergonomic comfort over expansive screen usage.

### Spacing & Grid System
- **Reading Chamber**: Limited to a maximum width of `46rem` (approx. 65–75 characters per line for Latin translation, or 10–14 words per line for Arabic scripture).
- **Navigation & Drawer Shell**: Floating or collapsible side rail on desktop (`18rem` width), transitioning to an overlay bottom-sheet on mobile devices.
- **Responsive Fluidity**:
  - **Mobile (<640px)**: Single column view. Gutter padding is `1.25rem`. Top navigation auto-hides on downward scroll and reappears with a gentle upward flick. Persistent bottom control sheet handles verse progress and quick toggles.
  - **Tablet (640px - 1024px)**: Single column with option for split bilingual view (Arabic top, translation bottom; or side-by-side in landscape). Margins expand to `2.5rem`.
  - **Desktop (>1024px)**: Central reader column flanked by a collapsible table of contents on the right (or left in RTL mode) and a scholar's footnote/commentary rail on the opposite flank.

## Elevation & Depth
Elevation is rendered through **soft tonal layering** and **fine hairline borders** reminiscent of archival bookbinding, rejecting heavy drop shadows that distract from text immersion.

- **Canvas (Level 0)**: Base reading viewport. Monochromatic surface without shadow.
- **Book Cards & Panels (Level 1)**: Elevated via a 1px border (`border-subtle`) paired with an ambient warmth tint: `box-shadow: 0 1px 3px rgba(35, 31, 32, 0.04), 0 1px 2px rgba(35, 31, 32, 0.02)`. In dark mode: `rgba(0, 0, 0, 0.35)`.
- **Floating Controls & Modals (Level 2)**: Persistent reader toolbars (A-/A+, theme switch, offline manager) employ semi-opaque surfaces using CSS backdrop filters (`backdrop-blur: 12px; background-color: var(--surface-bg-85)`). Shadows are soft and diffused: `0 8px 24px -4px rgba(27, 77, 62, 0.08)`.
- **Full Drawers & Overlays (Level 3)**: Deep parchment-tinted backdrops with a 24% dark overlay mask (`#12161A3D`) and soft interior rim highlights (`inset 0 1px 0 rgba(255, 255, 255, 0.2)` in light/sepia).

## Shapes
The system implements a refined **Soft (`1`)** shape language with subtle geometric corner radii. This preserves the architectural structure of traditional books and bound paper folios while avoiding the starkness of sharp 90-degree corners.

- **Buttons, Menus, & Chips**: `0.25rem` (`rounded-sm`) to `0.375rem` (`rounded`).
- **Cards, Modals, & Reading Sheets**: `0.5rem` (`rounded-lg`).
- **Floating Toolbars & Offline Status Pills**: `9999px` (`rounded-full`) to distinctly separate transient chrome controls from page geometry.

## Components

### Buttons & Reader Action Icons
- **Primary Button**: Background of serene emerald (`#1B4D3E`), text in `#FDFBF7`, padding `0.625rem 1.25rem`, subtle roundedness `0.375rem`. Hover introduces a rich gold focus outline (`#C5A059`, 2px offset).
- **Secondary / Ghost Button**: Transparent surface with 1px hairline border in `border-subtle`, text matching primary reading mode color. Hover transitions background to 5% opacity emerald.
- **Reader Tool Icon Buttons**: Square proportions (`40x40px`), flex-centered, minimal styling. Hover displays a faint disc illumination.

### Chips & Badges
- **Offline / IndexedDB Status Badge**: Compact pill (`rounded-full`) displaying a subtle state dot (Emerald for "Available Offline", Gold for "Syncing to Cache"). Uses `ui-caption` typography with `px-2.5 py-0.5`.
- **Juz / Surah / Chapter Tags**: Outlined parchment chips with gold border accentuation (`#C5A059`), communicating textual metadata without visual weight.

### Reading Controls Toolbar
- **Theme Picker**: Three-state circular segment toggle displaying Light (`#FDFBF7`), Sepia (`#F4ECD8`), and Dark (`#12161A`). The active choice is highlighted by a gold double-ring halo (`ring-2 ring-[#C5A059] ring-offset-2`).
- **Type Scaler (`A- / A+`)**: Stepped horizontal segmented control allowing line-height and font size incrementation (from 16px up to 34px Arabic base).
- **Font Switcher Segment**: Toggle buttons between `Amiri` and `Scheherazade New` with instant non-reloading preview in IndexedDB storage.

### Cards (Library & Chapter Browsers)
- **Book Card**: Ratio 3:4 or horizontal folio list. Features a faint spine impression on the inner edge (1px shadow gradient), cover thumbnail, Arabic title in prominent display serif, and an offline storage progress bar along the bottom edge.

### Verse & Text Segments
- **Ayah / Verse Wrapper**: Highlightable paragraph container. On tap/click, background shifts to a faint gold/emerald tint (`rgba(197, 176, 89, 0.08)`), revealing inline actions: Copy Verse, Play Recitation, Bookmark, View Tafsir.
- **Verse Number Marker**: Intricate circular or ornamental cartouche housing Eastern Arabic or Western Arabic numerals, rendered in primary emerald or muted gold.

### Navigation Drawer & Sheet
- **Surah Index / Chapter List**: Clean vertical list with alternating hover tints, displaying Surah name in Arabic calligraphy, transliteration, Revelation type (Meccan/Medinan badge), and verse count. Supports quick letter-jump indexing.