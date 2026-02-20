# WebOnAI Template Blueprint

## Part 1: Project Blueprint

### 1) What this project is
- A Next.js template renderer that loads a base config and merges a template override JSON.
- It supports two rendering modes:
  - Composed sections via `layout.sections[]` (recommended)
  - Legacy section order via `layout.order` + `sections` (fallback)

### 2) Config loading flow
- Base config: `src/data/config.json`
- Template override: `public/templates/<templateKey>.json`
- Template key sources (priority):
  1. `?template=<key>` query param
  2. `localStorage['webonai_template']`
  3. `NEXT_PUBLIC_SITE_TEMPLATE` or `NEXT_PUBLIC_SITE_CONFIG`
  4. `default`
- Merge behavior: deep object merge, arrays replaced by override arrays.

### 3) Rendering flow
- Main renderer: `src/app/page.tsx`
- Section registry includes legacy sections and `blocks`.
- If `layout.sections[]` exists, it renders those items first-class.
- Each composed item can:
  - `source`: read from `sections[source]`
  - `data`: inline section payload

### 4) Why blocks-first
- Blocks makes structure composable in JSON (no per-template TSX edits for each layout idea).
- New templates can be highly unique while sharing one renderer.
- Better fit for AI-generated templates.

### 5) Current block primitives
Implemented in `src/app/components/sections/Blocks.tsx`:
- `heading`
- `paragraph`
- `image`
- `imageGrid`
- `buttonRow`
- `cards`
- `divider`
- `spacer`
- `group`
- `split`
- `heroOverlay`
- `navBar`
- `formRow`
- `linkList`

### 6) Editing/visual editor integration
- Editable attributes are attached with `editable()` from `src/lib/editable.ts`.
- In iframe edit mode, elements expose `data-path` and `data-type` for selection.
- Dashboard can push full config updates with postMessage (`WEBONAI_CONFIG_UPDATE`).

---

## Part 2: How To Write A Template (For Agent Use)

This section is intended for template-generation agents.

### 1) Non-negotiable rules
1. Keep template JSON small and focused: only override what you need.
2. Prefer `layout.sections[]` with `type: "blocks"`.
3. Set `layout.hiddenSections` to hide legacy sections not used.
4. Use clear `id` values per section (`<theme>-<section-name>`).
5. Use Unsplash (or allowed assets) for images.
6. Keep text and class names readable and intentional.

### 2) Minimal template skeleton
```json
{
  "meta": {
    "siteName": "Template Name",
    "description": "Template description"
  },
  "theme": {
    "mode": "light",
    "colors": {
      "light": { "primary": "#..." },
      "dark": { "primary": "#..." }
    }
  },
  "layout": {
    "order": [],
    "hiddenSections": ["header","hero","features","testimonials","faq","blog","cta","footer"],
    "sections": [
      {
        "id": "theme-nav",
        "type": "blocks",
        "enabled": true,
        "data": {
          "container": { "enabled": true, "className": "..." },
          "innerWrapper": { "enabled": true, "className": "..." },
          "blocks": []
        }
      }
    ]
  }
}
```

### 3) Recommended composition pattern
1. Nav section (`navBar`)
2. Hero section (`heroOverlay` or `split`)
3. Core content blocks (`split`, `cards`, `imageGrid`)
4. CTA/lead capture (`formRow`)
5. Footer links (`linkList` + `split`)

### 4) Block usage cheat sheet
- `heroOverlay`: full image hero with overlaid content and optional corner notes.
- `split`: two-column layouts (`ratio`: `1:1`, `2:1`, `1:2`).
- `group`: cluster small related blocks with shared container class.
- `cards`: service/features grids.
- `imageGrid`: galleries/case studies.
- `formRow`: email + button row.
- `linkList`: nav/footer/menu link rows.

### 5) Class strategy (important)
- Use explicit `py-0 sm:py-0 lg:py-0` when a section must have zero vertical padding.
- For left-aligned titles/text, set `align: "left"`.
- Keep contrast strong for readability.
- Keep mobile spacing intentional (`px-6`, `pt-*`, `pb-*`, etc.).

### 6) Image strategy
- Use consistent aspect ratios by context:
  - Hero: `aspect-[16/9]`, `aspect-[21/9]`, or full `heroOverlay`
  - Portrait: `aspect-[4/5]`
  - Gallery: `aspect-[4/5]` or `aspect-[4/3]`
- Always set meaningful `alt` text.

### 7) Common mistakes to avoid
- Mixing legacy sections and blocks without intent.
- Leaving default spacing classes that cause oversized headers/blank gaps.
- Using placeholders that render as garbage (`?` prefixes or broken emojis).
- Hardcoding too many classes when not needed.

### 8) Validation checklist before shipping
1. JSON parses.
2. `layout.sections` all enabled/typed correctly.
3. Visual hierarchy works on mobile and desktop.
4. No overlapping fixed header with hero content.
5. No unreadable text (contrast check).
6. Links/anchors resolve to existing IDs.

---

## Blog in Blocks: Current Status
Short answer: **not as a dedicated dynamic posts block yet**.

- You can still render blog posts via legacy section component by adding an item like:
  - `{"type":"blog","source":"blog"}`
- Or create a blog-like layout manually using blocks (`heading`, `imageGrid`, `cards`, `buttonRow`).

Important:
- Dynamic post injection (`initialPosts`) currently feeds `sections.blog` and is used by the `Blog` section component.
- If you need true dynamic blog inside blocks, add a new block primitive (e.g. `postGrid`) wired to the post source.
