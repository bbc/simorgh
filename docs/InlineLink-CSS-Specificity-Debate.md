# InlineLink CSS specificity debate

## Context

`InlineLink` has moved from Emotion to SCSS Modules. `EmbedError` needs a black default link colour and a black 1px underline, while `InlineLink` owns the general link behaviour:

- default colour and underline
- visited styling
- hover and focus styling

Both components ultimately add classes to the same `<a>` element. CSS does not know that `EmbedError` is the React parent of `InlineLink`, and CSS Modules only scopes and hashes class names. It does not give a consumer class automatic precedence.

## Why a plain override is fragile

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

## Double selectors

CSS permits the same class selector to appear more than once in a compound selector:

```scss
.inlineLink.inlineLink {
  color: #000;
}
```

The element only needs one matching class in its HTML. Repeating the selector increases its specificity from `0-1-0` to `0-2-0` without requiring `!important`.

MDN documents this technique directly:

[Increasing specificity by duplicating selector - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity#increasing_specificity_by_duplicating_selector)

MDN describes selector duplication as a technique to increase specificity, but recommends using it sparingly and documenting why it is needed. It is a valid CSS technique, but it is a specificity workaround rather than a normal component-composition API.

## State handling

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

## Alternative: custom properties

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

This avoids a specificity fight and lets `InlineLink` keep ownership of its pseudo-states. The trade-off is that every future consumer override requires `InlineLink` to expose another custom property, which weakens the open-closed argument and couples the base component to its consumers.

## Alternative: migrate consumers together

The most explicit option is to migrate `EmbedError` alongside `InlineLink`, as its own SCSS class can then express the intended override without passing a legacy Emotion `css` prop. Consumers that still pass Emotion styles, such as the blocked `Disclaimer`, need their own migration decision rather than a generic compatibility heuristic.

## Question for review

Which trade-off should we prefer for future migrations?

1. Use a contextual selector for a consumer-owned modifier, with state exclusions.
2. Add custom properties to the shared component for every supported override.
3. Migrate or block every consumer that passes styles into the component before deleting its Emotion styles.

The current implementation uses option 1 for `EmbedError`. The double-selector technique remains a valid CSS fallback, documented by MDN above, but is not needed when the component owns a meaningful ancestor or element context. The migration guidance recommends identifying styled consumers before converting a shared component.
