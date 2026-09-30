# mergeCssMediaQueries

Folds repeated `@media` blocks in the AMP/Lite inline `<style>` into one block
per distinct query.

The inline stylesheet concatenates many component chunks, so the same media
query is emitted once per component. A typical article ships over 200 `@media`
blocks covering only around 35 distinct queries, and every repeat re-sends the
query text. Removing those repeats is worth roughly 10% of the inline CSS,
which matters against AMP's hard 75KB limit.

Queries are normalised before comparison because Emotion emits
`(min-width: 37.5rem)` while the Next CSS pipeline emits `(min-width:37.5rem)`.
Without that step the same breakpoint never merges with itself.

## Why this is safe

Merging moves rules, and moving a rule past another rule with the same
selector and specificity can change which one wins. So a block is only merged
when **every** rule inside it is built from per-component hashed class names,
either Emotion's `.css-<hash>` or CSS Modules' `.Name_key__hash`. Those
selectors cannot match another component's elements, so their position
relative to the rest of the stylesheet has no effect.

Any block containing an element selector, a global ancestor or an unhashed
class is left exactly where it is. The relative order of merged rules is
preserved.

This trades a little compression for a lot of safety: merging every identical
query regardless of selector would save about 13% rather than 10%, but could
reorder global rules.
