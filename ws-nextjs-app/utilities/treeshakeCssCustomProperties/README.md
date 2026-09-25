# treeshakeCssCustomProperties

Removes unused CSS custom properties from `:root {}` blocks in a stylesheet.

Intended for the AMP/Lite inline `<style>` where every rule is concatenated
into one string, so the complete usage picture is available. Service themes
declare their full palette and font-variant token sets on `:root`, but any
given page references only a fraction of them, so the rest are dead weight
against AMP's 75KB inline-CSS limit.

Safe because Simorgh never references custom properties from inline `style`
attributes (only from stylesheets) and AMP runs no custom JS, so the final
CSS string is the single source of truth for what is used.
