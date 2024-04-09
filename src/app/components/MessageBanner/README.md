## Description

This component renders a message banner which comprises an H2 heading, a link (styled as a CTA), an image and a description as a paragraph. These elements sit within a region landmark. The banner can be rendered anywhere on a page and uses the curation `visualStyle` of `BANNER`. The banner background is generated programmatically with CSS radial and linear colour gradients at each breakpoint.

## Props

| Name        | type   | Description                               |
| ----------- | ------ | ----------------------------------------- |
| heading     | string | The H2 title of the banner                |
| description | string | A subtext description as a paragraph      |
| link        | string | An href link to the CTA link destination  |
| linkText    | string | The text displayed within the CTA element |
| image       | string | The URL of the chosen image               |

## How to use

```tsx
{
  <MessageBanner
    heading={heading}
    description={description}
    link={link}
    linkText={linkText}
    image={image}
  />;
}
```
