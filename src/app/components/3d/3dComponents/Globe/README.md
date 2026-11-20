# World Service globe

The homepage renders the globe only when the request pathname is `/ws/languages`.

The globe loads `public/3d/Models/test_globe_v5.glb`. Meshes `1`-`6`
correspond to the regions in the World Service navigation order. Mesh `7`
represents the rest of the world, and mesh `8` is the existing sphere.
Both non-region meshes are non-interactive.

The globe has 32px (2rem) of padding above it on mobile and 40px (2.5rem)
from the 600px breakpoint, using the quadruple and quintuple spacing tokens.

The Service Regions panel has the same height in its default and selected
states, budgeted for a two-line heading and four normal single-line language
links, including padding. Wrapped headings or link labels can reduce the number
of visible links; text is not truncated.

The heading stays outside a labelled, keyboard-focusable scroll area. Longer
language lists and the default introduction/Read more content scroll natively.
Changing regions resets the content's scroll position to the top.

Available regions use postbox red by default and live teal (`LIVE_LIGHT`) when selected.
The rest of the world uses medium grey (`GREY_5`); the sphere uses pale
grey (`GREY_3`) with tone mapping disabled to preserve its brightness.

The GLB contains geometry without textures.

The globe is a prototype: canvas selection does not yet have a keyboard
equivalent. Keep the existing language navigation available; this upgrade
does not make the globe a replacement for accessible navigation.
