# trimFontFaceSourcesToWoff2

Trims `@font-face` `src` lists down to their woff2 source only.

Service themes ship each face with a woff2 source plus a legacy woff
fallback, e.g.

```
src:
  url('…BBCReithSans_W_Bd.woff2') format('woff2'),
  url('…BBCReithSans_W_Bd.woff') format('woff');
```

Every AMP-capable browser supports woff2, so the fallback is dead weight
against AMP's 75KB inline-CSS limit. Intended for the AMP/Lite inline
`<style>` only.

`local(...)` entries are preserved (they avoid a download), and a face is
left untouched if it has no woff2 source, so a font is never removed
entirely.
