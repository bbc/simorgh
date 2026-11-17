# ReadTimeTabs (prototype)

Tabbed "Short reads" / "Long reads" onward journey. Items are classified by their own `readTime` (whole minutes) and switched locally, with no further requests.

## Status: blocked on a data contract change

The component is complete against a typed boundary, but **it is not wired into any page**, because the client-side data does not currently contain read time.

| Source                                                                                                       | Has read time?                                                           |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Client endpoint `/fd/simorgh-bff?onwardJourney=topicDiscovery` (`TopicDiscoveryItem`, `useFetchTopicPromos`) | No                                                                       |
| Article-page `Recommendation` (`models/types/onwardJourney.ts`)                                              | No                                                                       |
| Curation `Summary.readTime?: number`                                                                         | Typed, but not rendered anywhere and present in only one untyped fixture |
| Article page data `metadata.stats.readTime`                                                                  | Yes, integer minutes, but only for the article being viewed              |

Read time is not computable from any returned metadata (no word count on items).

### Smallest contract change

The BFF returns `readTime` (integer minutes, from the article's `metadata.stats.readTime`) on each article item of the onward-journey response consumed by a read-time recommendations fetch. `Summary.readTime` already exists in the TypeScript model, so no frontend type change is required. After that, add a `useFetch…` hook modelled on `TopicDiscovery/useFetchTopicPromos` (single fetch, `useNearViewport`, abort on unmount) that feeds `items`, `isLoading` and `isError` into this component.

## Behaviour

- `SHORT_READ_MAX_MINUTES = 4` (`classifyByReadTime.ts`). No existing convention was found. Short: `<= 4`; long: `>= 5`.
- Missing, zero, negative, `NaN`, non-numeric and fractional read times are **excluded**. Placing them in either tab would be a guess, and an unfiltered fallback list would blur the tabs' meaning. This matches `ArticlePage`, which also hides read time when it is absent or 0.
- Duplicate ids and items without `id`, `title` or `link` are dropped; non-array input yields nothing.
- Both groups populated: tabs, defaulting to Short reads. One group: heading and list, no tabs. None: the component renders nothing. Loading: skeleton. Error: `role="alert"` message.
- Tabs reuse `TopicDiscovery/ScrollableTabs` (`role="tab"`, `aria-selected`, labelled `tabpanel`), keeping its keyboard behaviour. Cards reuse `CurationGrid` with the opt-in `showReadTime` flag.
- Labels come from optional `translations.readTimeRecommendations`, with English defaults. No service config has been translated yet.
- Analytics: view tracking `read-time-tabs`, tab clicks `read-time-tabs-tab`, promo clicks `read-time-tabs-promo`.
