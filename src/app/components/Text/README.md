# Text [![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://simorghstorybook.now.sh/?selectedKind=Text)

## Description

The 'Text' component is intended to be used to parse all article story text. It takes [markdown](https://en.wikipedia.org/wiki/Markdown) as an input and converts it to the desired HTML markup. It has special treatment for inline links as they are handled differently if they point to a link inside Simorgh.


## When to use this component

This component is used throughout the page in visible text. It uses the [`Paragraph`](../Paragraph) styling and thus is not suitable for all text which may have different design requirements.

## Accessibility notes

This component has no features specifically targeted at accessibility however it does ensure that the correct HTML tags are used, such as `<i>`, `<b>` and `<p>` which should ensure that users using screen readers are aware of the desired inference.
