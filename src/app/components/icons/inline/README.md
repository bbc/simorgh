# Inline icons

`coreIcons`, `mediaIcons` and `navigationIcons` export decorative React elements
for inline use. They retain the original GEL artwork, view boxes and intrinsic
dimensions. Navigation elements can be cloned to add AMP binding attributes.

```tsx
import { mediaIcons } from '#app/components/icons/inline';

<span aria-hidden="true">{mediaIcons.audio}</span>;
```

These assets intentionally remain inline. The sibling `icons` API serves
external assets; replacing these SVGs with external images would change their
geometry, styling and AMP contracts.

SCSS Modules provide default dimensions, colour and spacing. Existing consumer
selectors such as `.wrapper > svg` retain precedence. Video dark-UI colour
changes use CSS custom properties so state selectors do not outrank
consumer colour overrides. Lite video uses its request context at every width;
canonical and AMP video switch colour only below 400px. Inline podcast promo
icons retain the existing `.podcastIconWrapper` sizing contract.

Service logos and their ratio metadata remain in
`ThemeProviderSCSSModules/chameleonLogos`, not this icon collection.
