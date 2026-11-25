# AMP boilerplate

Import the required AMP CSS and script elements from
`#app/lib/amp/boilerplate`. The renderer, AMP components and Storybook decorator
share this module.

`AMP_SCRIPT` and `AMP_NO_SCRIPT` are the exact required boilerplate CSS bytes.
Keep them separate from SCSS Modules and `amp-custom` CSS: AMP requires dedicated
`style[amp-boilerplate]` elements, including the no-JavaScript fallback.

The runtime and extension script elements preserve their `async`,
`custom-element` / `custom-template` attributes and versioned AMP URLs.
