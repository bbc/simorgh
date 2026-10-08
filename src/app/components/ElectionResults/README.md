# ElectionResults

A plain list of the election data simorgh-bff sends in `secondaryData.electionBanner`. It only proves the data and config reach the article page. It is not a design.

Shows the title, status, lastUpdated, states counted, banner image, CTA, and for each candidate: name, party, colour, vote %, total votes and winner. Missing values show as `null`.

```tsx
<ElectionResults results={pageData.electionBanner} />
```
