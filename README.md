# WebOnAI Template Starter

A Next.js template renderer for generating highly varied websites from JSON config.

This repo now supports a **blocks-first** approach, so new templates can be structurally unique without editing section components for every style.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To preview a template:
- Query param: `http://localhost:3000?template=farm`
- Or set local storage key: `webonai_template`

## How Rendering Works

1. Base config loads from `src/data/config.json`.
2. Template override loads from `public/templates/<template>.json`.
3. Configs are deep-merged in `src/context/ConfigContext.tsx`.
4. Page renderer (`src/app/page.tsx`) prefers `layout.sections[]` composition.
5. If `layout.sections[]` is missing, it falls back to legacy `layout.order`.

## Template Architecture (Recommended)

Use `layout.sections[]` with `type: "blocks"`.

Current block primitives live in `src/app/components/sections/Blocks.tsx`:
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

For detailed authoring guidance, see `blueprint.md`.

## Creating a New Template

1. Add `public/templates/<name>.json`.
2. Start from a minimal skeleton:
- `meta`
- `theme`
- `layout.hiddenSections`
- `layout.sections` (blocks-first)
3. Keep classes and spacing explicit (`py-0 sm:py-0 lg:py-0` where needed).
4. Use meaningful IDs for anchor links (`#contact`, `#menu`, etc.).
5. Validate JSON and visual behavior on desktop + mobile.

## Contributing Guidelines

### Scope
- Prefer JSON/template changes over component changes.
- Only modify shared components (`Blocks.tsx`, renderer, types) when a reusable primitive is needed.

### Code Style
- Keep edits ASCII unless a file already uses Unicode intentionally.
- Keep component logic simple and composable.
- Avoid one-off template hacks in shared components.

### When Adding a New Block Primitive
- Add render logic in `Blocks.tsx`.
- Keep the primitive generic (reusable across themes).
- Confirm existing templates still render.
- Document new primitive usage in `blueprint.md`.

### Testing Checklist (Manual)
- Template renders with `?template=<name>`.
- No overlapping fixed header/hero issues.
- Contrast and readability are acceptable.
- Anchors and CTA links work.
- Mobile layout is usable.

## Pull Request Checklist

- [ ] JSON parses
- [ ] Uses blocks-first composition (unless legacy section intentionally required)
- [ ] No unrelated file changes
- [ ] Visual pass completed on at least one mobile and one desktop width
- [ ] `blueprint.md` updated if behavior/primitive changed

## Useful Files

- `src/context/ConfigContext.tsx` - config loading + merge
- `src/app/page.tsx` - section composition renderer
- `src/app/components/sections/Blocks.tsx` - block primitives
- `public/templates/*.json` - template overrides
- `blueprint.md` - project and template authoring blueprint
