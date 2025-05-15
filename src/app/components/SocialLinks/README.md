## Description

This component renders a set of Social Links within a section element. Each social link item contains an image (or image placeholder) and a link with a title. These elements sit within a region landmark.
The link has a tap area that includes the image/placeholder. The component uses the curation `visualStyle` of `LINKS` and `visualProminence` of `NORMAL`.

## Props

| Name      | type      | Description                                          |
| --------- | --------- | ---------------------------------------------------- |
| title     | string    | The H2 title of the social links section             |
| position  | number    | The position of the curation item                    |
| summaries | Summary[] | List of summary objects as returned from Simorgh BFF |

## How to use

```tsx
<SocialLinks
  summaries={summaries}
  position={position}
  title={title}
/>
```
