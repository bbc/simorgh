# Inline Link [![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://simorghstorybook.now.sh/?selectedKind=InlineLink)

## Description

The `Inline Link` component is made up of a styled HTML `<a>` element with an `href` attribute. Links open in the current tab. 

## When to use this component

The purpose of this component is to return an inline link element.

`Inline Link` is made use of indirectly in the [Text](../Text) component, which uses the [Inline Link Container](../../containers/InlineLink) to render an `Inline Link`.

The [Paragraph Container](../../containers/Paragraph) also renders the `Inline Link` component indirectly via the [Inline Link Container](../../containers/InlineLink).

## Accessibility notes 

The `Inline Link` includes:
* Generous tap target across breakpoints, for ease of tapping
* Link states (default, hover, focus and visited) that meet contrast ratios specified in [BBC Future Media Standards & Guidelines](http://www.bbc.co.uk/guidelines/futuremedia/accessibility/html/colour-contrast.shtml) for accessibility
* Keyboard operability. Users can navigate to and operate each `Inline Link` using the keyboard alone. This in turn enables `Inline Link`'s operability by screen readers, alternative keyboards or input devices.
