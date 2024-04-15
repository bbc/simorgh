## Description

This component renders a Billboard which comprises an H2 heading, a link contained within an anchor that provides a tap area the component, an image and a description as a paragraph. These elements sit within a region landmark. The banner can be rendered anywhere on a page and uses the curation `visualStyle` of `BANNER` and `visualProminence` of `MAXIMUM`. The banner background is generated with a `MaskedImage` using a CSS radial and linear colour generated gradient at each breakpoint.

## Props

| Name                 | type                   | Description                                    |
| ---------------------| -----------------------| -----------------------------------------------|
| heading              | string                 | The H2 title of the banner                     |
| description          | string                 | A subtext description as a paragraph           |
| link                 | string                 | An href link to the CTA link destination       |
| image                | string                 | The URL of the chosen image                    |
| altText              | string                 | The alt text of the chosen image               |
| eventTrackingData    | eventTrackingMetadata  | Contains click and view tracking data for Piano|
| showLiveLabel        | boolean                | Displays the live label for live promos        |

## How to use

```tsx
{
    <Billboard
        heading="Billboard Heading"
        description="Description"
        link="https://www.bbc.com/ws/languages"
        image="https://ichef.bbci.co.uk/ace/ws/raw/cpsprodpb/36D1/production/_127933041__63970643_bbc-news-world-service-logo-nc.png"
        altText="alt text"
        eventTrackingData={{ componentName: 'billboard' }}
        showLiveLabel
    />,
}
```
