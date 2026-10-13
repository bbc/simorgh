## Description

The `ArticleElectionResults` component is the election results banner shown above the article grid. It renders the election data simorgh-bff returns as `secondaryData.electionBanner`, which `ArticlePage` passes in as `pageData.electionBanner`. When there is no election data, `ArticlePage` shows the existing iframe `ElectionBanner` instead.

## Props

| Argument  | Type               | Required | Default | Example                      |
| --------- | ------------------ | -------- | ------- | ---------------------------- |
| results   | `ElectionResults`  | Yes      | -       | `pageData.electionBanner`    |
| aboutTags | `Tag[]`            | No       | -       | `metadata.tags.about`        |
| taggings  | `MetadataTaggings` | No       | -       | `metadata.passport.taggings` |

The `ElectionResults` data type is in `src/app/models/types/elections.ts`.

## Usage

```tsx
<ArticleElectionResults
  results={pageData.electionBanner}
  aboutTags={aboutTags}
  taggings={taggings}
/>
```

The layout uses logical CSS properties, so it flips for right-to-left services without extra props:

```tsx
<ServiceContextProvider service="arabic">
  <ArticleElectionResults results={pageData.electionBanner} />
</ServiceContextProvider>
```

### When to use this component

On article pages, when simorgh-bff returns election data for the service.

### When not to use this component

On other page types, or to show the iframe-based banner. Use `ElectionBanner` for that.

### Accessibility notes

- The title is a level 2 heading.
- Candidates are a list. Each item reads the candidate name, party and vote percentage as text, so the bars carry no information that is only visual.
- The live dot and the arrow on "How this election works" are decorative and hidden from screen readers with `aria-hidden`.
- "How this election works" is a `button` with `type="button"`. It does not open anything yet, so it has no `aria-expanded`. Add one when it gets content.

## Data source

| Part           | Field                                                   |
| -------------- | ------------------------------------------------------- |
| Title          | `title`                                                 |
| Candidate row  | `name`, `party.shortName`, vote `votesPercentage`       |
| Bar            | Width relative to the leading candidate, `party.colour` |
| States counted | `reporting.returned` of `reporting.total`               |
| Results button | `CTA.text`, `CTA.link`                                  |
| Last updated   | `lastUpdated` (Unix seconds)                            |

Missing values show as `null`.

## Behaviour

Not done yet:

- **Spread:** shows `reporting.returned/total` as a placeholder. simorgh-bff always sends `achievedAreas: null` for now.
- **LIVE updates:** uses `CTA.link` until there is a live page link.
- **How this election works:** no content yet.

The service config will need:

```ts
electionResults: {
  thingIds: ['<election topic thingId>'],
  liveLink: 'https://www.bbc.com/hausa/live/<id>', // optional
},
```

## Storybook

`Pages/Article Page/ArticleElectionResults`, with Default (Hausa) and RightToLeft (Arabic) stories using `fixtures.ts`.

## Testing

```bash
yarn jest src/app/pages/ArticlePage/ArticleElectionResults
```
