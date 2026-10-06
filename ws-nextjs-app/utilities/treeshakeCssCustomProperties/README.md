# treeshakeCssCustomProperties

Removes unused CSS custom properties from `:root {}` blocks in a stylesheet.

Intended for the AMP/Lite inline `<style>` where every rule is concatenated
into one string, so the complete usage picture is available. Service themes
declare their full palette and font-variant token sets on `:root`, but any
given page references only a fraction of them, so the rest are dead weight
against AMP's 75KB inline-CSS limit.

Runtime typography sets `--gel-*` custom properties in inline `style`
attributes, so the stylesheet alone is not the full usage picture. Pass the
rendered HTML as the second `usageSource` argument; any custom property it
references is kept. Omitting it will silently drop tokens that only inline
styles reference, and those declarations then fall back to `inherit`.
