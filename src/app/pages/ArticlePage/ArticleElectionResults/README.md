# ArticleElectionResults

Applied component that renders `ElectionResults` above the article grid, using the results simorgh-bff returns as `secondaryData.electionBanner`.

## Props

| Name      | Type                      | Required | Description                                          |
| --------- | ------------------------- | -------- | ---------------------------------------------------- |
| results   | `ElectionResults \| null` | No       | `pageData.electionBanner` from the article route     |
| aboutTags | `Tag[]`                   | Yes      | Matched against `electionResults.thingIds`           |
| taggings  | `MetadataTaggings`        | Yes      | Editorially sensitive articles never show the banner |

## Rendering conditions

The banner renders only when all of these are true:

- the BFF returned results (it does so only while the service's `electionBanner` toggle is on and its config loads)
- the `electionBanner` toggle is enabled in Simorgh
- one of the article's about-tags is in the service config's `electionResults.thingIds`
- the article is not tagged with the editorial-sensitivity ID
- the request is not AMP or Lite

## Service configuration

```ts
electionResults: {
  thingIds: ['<election topic thingId>'],
  liveLink: 'https://www.bbc.com/hausa/live/<id>', // optional
},
```

## Component hierarchy

- Complex component: `ElectionResults` (`src/app/components/ElectionResults`)
- Applied component (this one): `ArticleElectionResults`
