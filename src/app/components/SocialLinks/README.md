## Description

This component renders a set of Social Links within a section element. Each social link item contains an image (or image placeholder) and a link with a title. These elements sit within a region landmark.
The link has a tap area that includes the image/placeholder. The component uses the curation `visualStyle` of `LINKS` and `visualProminence` of `NORMAL`.

## Props

| Name      | type      | Description                                          |
| --------- | --------- | ---------------------------------------------------- |
| id        | string    | (optional) default id value: social-links-1          |
| title     | string    | The H2 title of the social links section             |
| summaries | Summary[] | List of summary objects as returned from Simorgh BFF |

## How to use

```tsx
<UsefulLinks
  id={id}
  title={title}
  summaries={summaries}
/>
```
