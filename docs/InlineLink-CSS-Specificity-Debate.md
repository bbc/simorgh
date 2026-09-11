# InlineLink CSS override decision record

## Context

`InlineLink` has moved from Emotion to SCSS Modules. `EmbedError` needs a black default link colour and a black 1px underline, while `InlineLink` owns the general link behaviour:

- default colour and underline
- visited styling
- hover and focus styling

Both components ultimately add classes to the same `<a>` element. CSS does not know that `EmbedError` is the React parent of `InlineLink`, and CSS Modules only scopes and hashes class names. It does not give a consumer class automatic precedence.

## Migration context

Consumers that pass Emotion styles into a shared component should be migrated in the same change or reported as blocked. During this migration we briefly tried detecting Emotion-generated `css-*` class names and suppressing the shared component's base class. We rejected that workaround because the generated class does not express which declarations the consumer intends to replace; suppressing the base class also removed unrelated defaults, including pseudo-state rules. This is why the final implementation migrates `EmbedError` instead of inspecting generated class names at runtime.

## Decision

Use selectors based on DOM context owned by the consuming component, or on an element type fixed by that component. Keep the shared component responsible for its own interactive states, and exclude those states from the consumer override where necessary.

For `EmbedError`, the chosen pattern is:

```scss
.errorLinkWrapper {
  .inlineLink:not(:visited):not(:hover):not(:focus) {
    color: theme.$palette-black;
    border-bottom: #{theme.pixelsToRem-px-to-rem(1)} solid
      theme.$palette-black;
  }
}
```

This expresses the actual DOM relationship, avoids adding a wrapper solely for specificity, and does not require `InlineLink` to expose a new custom property for every consumer-specific variation.

### Preserving stateful styles

`InlineLink` also has more specific state rules:

```scss
.self:visited {
  color: #6e6e73;
}

.self:hover,
.self:focus {
  color: #b80000;
}
```

A consumer override must not accidentally take over those states. The current implementation uses the real DOM context owned by `EmbedError` and excludes them:

```scss
.errorLinkWrapper {
  .inlineLink:not(:visited):not(:hover):not(:focus) {
    color: theme.$palette-black;
    border-bottom: #{theme.pixelsToRem-px-to-rem(1)} solid
      theme.$palette-black;
  }
}
```

The `.errorLinkWrapper` ancestor expresses the actual component relationship and adds specificity without duplicating a class selector. The exclusions are important: the consumer rule stops matching during visited, hover, and focus, leaving those states to `InlineLink`.

For a component that fixes its rendered element type, an element-qualified selector is also appropriate. `Copyright` always renders `Text as="p"`, so `p.copyright` can override the remaining Emotion colour rule without adding a wrapper or duplicating the class.

## Alternatives considered

### Class-order override

This is a possible implementation:

```scss
/* InlineLink */
.self {
  color: #222;
}

/* EmbedError */
.inlineLink {
  color: #000;
}
```

Both selectors have specificity `0-1-0`. The class order in the HTML does not decide the winner. If the stylesheet rules have equal specificity, the later rule in the compiled CSS wins. That order can vary with bundling, code splitting, SSR, AMP/Lite extraction, Storybook, or future import changes.

React component hierarchy is not a CSS cascade mechanism.

### Duplicated selectors

CSS permits the same class selector to appear more than once in a compound selector:

```scss
.inlineLink.inlineLink {
  color: #000;
}
```

The element only needs one matching class in its HTML. Repeating the selector increases its specificity from `0-1-0` to `0-2-0` without requiring `!important`.

MDN documents this technique directly:

[Increasing specificity by duplicating selector - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity#increasing_specificity_by_duplicating_selector)

MDN describes selector duplication as a technique to increase specificity, but recommends using it sparingly and documenting why it is needed. It is valid CSS, but it is a specificity workaround rather than the preferred pattern when a meaningful DOM context exists.

### Custom properties

Another approach is to make `InlineLink` consume override variables:

```scss
/* InlineLink */
.self {
  color: var(--inline-link-color, theme.$palette-ebon);
  border-bottom: 1px solid
    var(--inline-link-border-color, theme.$palette-postbox);
}

/* EmbedError */
.inlineLink {
  --inline-link-color: #{theme.$palette-black};
  --inline-link-border-color: #{theme.$palette-black};
}
```

This avoids a specificity fight and lets `InlineLink` keep ownership of its pseudo-states. The trade-off is that every future consumer override requires `InlineLink` to expose another custom property, which violates the open-closed principle and couples the base component to its consumers.

## Outcome

The migration uses contextual selectors for `EmbedError`, `ReadTime`, and `Copyright`. Custom properties remain appropriate when a shared component is intentionally designed to expose configurable values, but adding one for every consumer override would couple the component to its consumers. Duplicated selectors remain a documented fallback when no meaningful DOM or element context exists.
