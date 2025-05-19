## Description

Renders a set of Useful Links within a section element. Each list item contains a link with a title. These elements sit within a region landmark.
The link has a tap area. The component uses the curation `visualStyle` of `LINKS` and `visualProminence` of `LOW`.

## Props

| Name      | type      | Description                                          |
| --------- | --------- | ---------------------------------------------------- |
| title     | string    | The H2 title of the social links section             |
| position  | number    | The position of the curation item                    |
| summaries | Summary[] | List of summary objects as returned from Simorgh BFF |

## How to use

```tsx
<UsefulLinks
  summaries={summaries}
  position={position}
  title={title}
/>
```