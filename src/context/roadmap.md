## Move from “config-driven content” to “config-driven composition”.

Best path:

1. Add section type + variant registry

- Each section declares what component to render (`heroSplit`, `galleryMasonry`, `timeline`, `pricingTable`, etc).
- `layout.order` becomes fully compositional, not tied to current fixed keys.

2. Make sections array-based instead of fixed object shape

- Instead of `sections.hero`, `sections.features`, use:
- sections: `[{ id, type, variant, props }]`
- Then render from a component map by type.

3. Add block-level content model

- Inside each section, support reusable blocks (`heading`, `text`, `image`, `cta`, `cardList`, `stat`).
- This lets you build radically different layouts without new top-level schema every time.

4. Use per-section style tokens (not only global theme)

- Add local style layer:
- styles: { padding, background, columns, align, radius, shadow, animation }
- Lets one site be editorial and another minimal/product-like from same engine.

5. Introduce slot-based templates

- Components expose slots (media, content, meta, actions).
- Config chooses which blocks go in which slot and in what order.

6. Add conditional rendering rules

- Example: show block only if hasTestimonials, posts.length > 0, mode === dark.
- Makes sections context-aware.

7. Support page-level schemas

- Each page declares its own section list.
- Not all pages need header/hero/footer structure.

8. Add plugin components
- Register new section types without editing core renderer each time.
Good for “this site should look nothing like the starter”.









What changed in ConfigContext.tsx
Template loading is now dynamic
Instead of hardcoding imports per template, it always starts from config.json and optionally fetches <key>.json.
Template key is resolved from:
?template=...
localStorage['webonai_template']
NEXT_PUBLIC_SITE_TEMPLATE / NEXT_PUBLIC_SITE_CONFIG
fallback: default
Deep merge behavior added
Base + template are merged recursively.
Arrays are replaced by the template array (not merged item-by-item).
Blog post injection preserved
initialPosts are still injected into sections.blog.posts via withInitialPosts().
PostMessage integration for editor/dashboard
Handles WEBONAI_CONFIG_UPDATE to hot-swap config from parent.
Handles WEBONAI_SET_MODE to toggle edit mode.
Iframe handshake + edit UX
Auto-detects iframe and sends WEBONAI_READY to parent.
In edit mode, click on any [data-path] sends WEBONAI_SELECT_ELEMENT with:
path
dataType
element rect (top/left/width/height/bottom)
Adds visual outlines for hover/selected editable elements.
Effect on Dashboard
Dashboard can now select templates without code changes in this repo.
It can push full live config updates over postMessage.
It gets a clear “ready” signal (WEBONAI_READY) for reliable initialization.
If template fetch fails/missing file, it cleanly falls back to default config.
Effect on Visual Editor
Element selection is path-driven and precise (data-path + bounding rect).
Edit mode can be explicitly toggled by parent (WEBONAI_SET_MODE).
Editing highlights are centralized in ConfigContext, so all templates get consistent selection behavior.