# Header [![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://simorghstorybook.now.sh/?selectedKind=Brand)	

## Description	
The `Brand` component provides the BBC News logo (as SVG), nested inside a styled span, link and div. The link is currently hardcoded to "https://www.bbc.co.uk/news". `Brand` takes a `brandName` as a prop. This prop is passed to a [VisuallyHiddenText](../VisuallyHiddenText) component, nested inside Brand. Note that this does not currently affect the branding itself, which always renders as `BBC NEWS`.

## When to use this component	
The `Brand` component is designed to be used where a BBC logo is required as SVG. `Brand` is used in the [BrandContainer](../../containers/Brand), which consumes a service context it passes to the `Brand`. 

## Accessibility notes	
* Visually hidden text is provided (e.g. for screen reader users)
* `Brand` is keyboard-accessible and provides hover and focus styles

