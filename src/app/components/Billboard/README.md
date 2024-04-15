## Description

This component renders a Billboard which comprises an H2 heading, a link contained within an anchor that provides a tap area the component, an image and a description as a paragraph. These elements sit within a region landmark. The banner can be rendered anywhere on a page and uses the curation `visualStyle` of `BANNER`. The banner background is generated with a `MaskedImage` using a CSS radial and linear colour generated gradient at each breakpoint.

## Props

| Name                 | type                   | Description                                    |
| ---------------------| -----------------------| -----------------------------------------------|
| heading              | string                 | The H2 title of the banner                     |
| description          | string                 | A subtext description as a paragraph           |
| link                 | string                 | An href link to the CTA link destination       |
| image                | string                 | The URL of the chosen image                    |
| eventTrackingData    | eventTrackingMetadata  | Contains click and view tracking data for Piano|
| showLiveLabel        | boolean                | Displays the live label for live promos        |
| lang                 | string                 | The services language code                     |

## How to use

```tsx
{
    <Billboard
        heading={kyrgyzBillboard.title}
        description={summary.description}
        link={summary.link}
        image={summary.imageUrl}
        eventTrackingData={eventTrackingData}
        showLiveLabel
        lang="ky"
    />,
}
```
