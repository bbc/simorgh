# Inline Link [![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://simorghstorybook.now.sh/?selectedKind=InlineLink)

## Description
The `Inline Link` component is made up by a styled HTML `<a>` element with an `href` attribute. Links open in the current tab. `Inline Link` is used in the [Text](../Text) component, where it is passed as an option to a markdown to jsx converter that renders text.

The [Paragraph Container](../../containers/Paragrah) Paragraph Container and the and [Inline Link Container](../../containers/IndlineLink) also render the `Inline Link`.

## Accessibility notes 
`Inline Link` comes with the following features built-in:
* Tap targets for ease of tapping
* Default, hover, focus and visited states meet contrast ratios specified in the [colour contrast](http://www.bbc.co.uk/guidelines/futuremedia/accessibility/html/colour-contrast.shtml) standard
* * Default: 
* * * color: #0F556C bluejay
* * * border-bottom: 1px solid #0F556C bluejay
* * * font-family: same as text
* * * background-color: not applicable
* * Hover: 
* * * background-color: #C3DEE7 bluejay light
* * * border: 2px solid #C3DEE7 bluejay light
* * * border-bottom-color: 1px solid #0F556C bluejay
* * * color: #0F556C bluejay
* * Focus:
* * * background-color: #0F556C bluejay
* * * border: 2px solid #0F556C bluejay
* * * border-bottom: 1px solid #F5F3F1 oat-light
* * * color: #F5F3F1 oat-light
* * Visited
* * * border-bottom: 1px solid #5C5752 pebble
* * * color: #5C5752 pebble
* * * background color: not applicable
* Users can navigate to and operate each `Inline Link` using the keyboard alone, which supports keyboard-only users and users who use screen readers, alternative keyboards or input devices.
