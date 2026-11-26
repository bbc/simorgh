# Shared icons

`coreIcons`, `mediaIcons` and `navigationIcons` export decorative React elements
with the original GEL artwork and dimensions.

```tsx
import { mediaIcons } from '#app/components/icons/shared';

<span aria-hidden="true">{mediaIcons.audio}</span>;
```

All media artwork is published under `public/images/icons/media-*.svg` and
rendered through the existing `ExternalSvg` API. CSS masks preserve
`currentColor`; its image/background fallbacks support browsers without masks
and AMP without introducing another external-asset renderer. These icons are
configured to inherit fallback dimensions from their styled icon box, so consumer
resizing also works without CSS custom properties. They are
decorative, with empty image alternatives and `aria-hidden`; translated names
remain on their existing links, headings and controls.

SCSS Modules provide default dimensions, colour and spacing. Consumer selectors
target `.external-svg` instead of `svg`, preserving their colour and sizing
overrides. Video dark-UI colour changes use CSS custom properties so state
selectors do not outrank consumer overrides. Lite video uses its request context
at every width; canonical and AMP video switch colour only below 400px. Podcast
promo icons retain the existing `.podcastIconWrapper` sizing contract.

Core icons and the navigation hamburger/cross remain inline in this migration.
Navigation elements are cloned to add AMP visibility bindings. Existing external
clock, play and close artwork has different geometry and is not substituted.
Service logos and ratio metadata remain in `ThemeProviderSCSSModules/chameleonLogos`.
