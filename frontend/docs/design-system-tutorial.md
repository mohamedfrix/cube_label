# Next.js & Tailwind CSS v4 — Design System Tutorial

> A chronological, end-to-end guide for implementing every design token
> from our Figma file ("OCR ui") into the Next.js codebase.
> Written for junior developers — read it top to bottom.

---

## Chapter 1: Why CSS Variables + Tailwind v4?

### The problem
Every UI needs consistent colours, spacing, and typography.
Without a shared contract the same blue ends up as five different hex
strings across fifty files.  A "design token" solves this — it's a
named value that is defined once and referenced everywhere.

### The Tailwind v4 approach
In **Tailwind CSS v4** (the version installed in this project) there is
no `tailwind.config.ts` for colours.  Instead you declare CSS custom
properties inside `@theme inline { … }` in your global stylesheet.
Tailwind reads them at build time and generates utility classes
automatically.

For example, writing `--color-brand: #275DD9;` inside `@theme` gives
you `bg-brand`, `text-brand`, `border-brand` for free.

---

## Chapter 2: Colors — the full map

Every colour below was extracted programmatically from the Figma file
using the `figma-community` MCP tool.  The **Figma token name** is in
the right-hand comment.

### 2.1  Named semantic tokens (Figma Local Variables)

| CSS variable              | Hex / value                     | Figma token name        |
|---------------------------|---------------------------------|-------------------------|
| `--color-brand-primary`   | `#275DD9`                       | Brand Primary color     |
| `--color-primary-blue`    | `#527DE1`                       | Primary Blue            |
| `--color-accent-grey-1`   | `#DEE2E6`                       | Accent/Grey 1           |
| `--color-accent-grey-2`   | `#CED4DA`                       | Accent/Grey 2           |
| `--color-accent-grey-3`   | `#6C757D`                       | Accent/Grey 3           |
| `--color-selected-item`   | `rgba(82, 125, 225, 0.1)`      | Selected-item           |

### 2.2  Neutrals (derived from fill tokens)

| CSS variable              | Hex       | Purpose                         |
|---------------------------|-----------|-------------------------------- |
| `--color-black`           | `#09090B` | Primary body text               |
| `--color-dark`            | `#18181B` | Sidebar bg, strong headings     |
| `--color-text-secondary`  | `#71717A` | Muted / secondary text          |
| `--color-text-tertiary`   | `#52525B` | Tertiary text                   |
| `--color-grey-light`      | `#F4F4F5` | Card / section backgrounds      |
| `--color-grey-lightest`   | `#FAFAFA` | Page canvas tint                |
| `--color-grey-border`     | `#E4E4E7` | Most common border              |
| `--color-grey-divider`    | `#E2E2E2` | Dividers                        |
| `--color-surface`         | `#F8F8F8` | Panel surfaces                  |
| `--color-surface-alt`     | `#F4F4F4` | Alternate surface               |
| `--color-input-bg`        | `#F1F1F1` | Input backgrounds               |

### 2.3  Status / feedback colours

| CSS variable              | Hex       | Role              |
|---------------------------|-----------|-----------------  |
| `--color-error`           | `#DC2626` | Error / delete    |
| `--color-success`         | `#5CC66E` | Success           |
| `--color-success-light`   | `#77DB89` | Lighter success   |
| `--color-success-bg`      | `#F2FFF4` | Success bg tint   |
| `--color-warning`         | `#F68D2B` | Warning           |
| `--color-info`            | `#344BFD` | Accent info blue  |
| `--color-highlight-blue`  | `#1671EB` | Interactive blue  |
| `--color-highlight-bg`    | `#EEF2FC` | Blue card tint    |

### 2.4  How it works in `globals.css`

```css
/* 1. Define the raw value as a CSS variable: */
:root {
  --color-brand-primary: #275DD9;
}

/* 2. Expose it to Tailwind under a short name: */
@theme inline {
  --color-brand: var(--color-brand-primary);
}
```

After this, you can write:
```html
<button class="bg-brand text-white">Save</button>
```

---

## Chapter 3: Typography

### Font family
The Figma file uses **Inter** everywhere (with one small instance of
Poppins).  In Next.js the project already loads `Geist Sans` via
`next/font`.  If you want pixel-perfect Figma parity, switch to Inter.

### Font sizes extracted
| Token            | px  | rem     |
|------------------|-----|---------|
| `--font-size-xs` | 12  | 0.75    |
| `--font-size-sm` | 14  | 0.875   |
| `--font-size-base`| 16 | 1       |
| `--font-size-lg` | 20  | 1.25    |
| `--font-size-xl` | 22  | 1.375   |
| `--font-size-2xl`| 24  | 1.5     |
| `--font-size-3xl`| 32  | 2       |

### Font weights used
| Weight | Tailwind class |
|--------|----------------|
| 400    | `font-normal`  |
| 500    | `font-medium`  |
| 600    | `font-semibold`|
| 700    | `font-bold`    |

---

## Chapter 4: Spacing

| Token            | px  | rem   |
|------------------|-----|-------|
| `--spacing-xs`   | 4   | 0.25  |
| `--spacing-sm`   | 8   | 0.5   |
| `--spacing-md`   | 16  | 1     |
| `--spacing-lg`   | 24  | 1.5   |
| `--spacing-xl`   | 32  | 2     |

Usage: `p-sm`, `gap-md`, `m-lg`, etc.

---

## Chapter 5: Border Radii

| Token          | px |
|----------------|----|
| `--radius-sm`  | 4  |
| `--radius-md`  | 6  |
| `--radius-lg`  | 8  |
| `--radius-xl`  | 12 |

Usage: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`.

---

## Quick-reference cheat sheet

```
bg-brand        → #275DD9
bg-primary      → #527DE1
text-muted      → #71717A
border-border   → #E4E4E7
bg-selected     → rgba(82,125,225,0.1)
bg-error        → #DC2626
bg-success      → #5CC66E
rounded-md      → 6px
p-md            → 16px
text-sm         → 14px
```
