# ReadTimeTabs (prototype)

Tabbed "Short reads" / "Long reads" onward journey. Items are classified by their own `readTime` (whole minutes) and switched locally, with no further requests.

## Status: wired behind the `readTimeRecommendations` toggle

`ReadTimeRecommendations` (container) calls `useFetchReadTimeRecommendations`, which makes one request per topic to `/fd/simorgh-bff?onwardJourney=readTimeRecommendations&id=<topicId>` (fabl-modules `simorgh-bff`). The BFF enriches each topic stream item with `readTime` (integer minutes, from the article's `metadata.stats.readTime`). Tab switching is local state only.

`ArticlePage` renders it in place of `TopicDiscovery` when both `topicDiscovery` and `readTimeRecommendations` toggles are on (not AMP, Lite or app), using the first topic from the same list TopicDiscovery shows. The toggle must exist remotely, and the BFF change must be deployed, before it works end to end.

## Behaviour

- `SHORT_READ_MAX_MINUTES = 4` (`classifyByReadTime.ts`). No existing convention was found. Short: `<= 4`; long: `>= 5`.
- Missing, zero, negative, `NaN`, non-numeric and fractional read times are **excluded**. Placing them in either tab would be a guess, and an unfiltered fallback list would blur the tabs' meaning. This matches `ArticlePage`, which also hides read time when it is absent or 0.
- Duplicate ids and items without `id`, `title` or `link` are dropped; non-array input yields nothing.
- Both groups populated: tabs, defaulting to Short reads. One group: heading and list, no tabs. None: the component renders nothing. Loading: skeleton. Error: `role="alert"` message.
- Tabs reuse `TopicDiscovery/ScrollableTabs` (`role="tab"`, `aria-selected`, labelled `tabpanel`), keeping its keyboard behaviour. Cards reuse `CurationGrid` with the opt-in `showReadTime` flag.
- Labels come from optional `translations.readTimeRecommendations`, with English defaults. No service config has been translated yet.
- Analytics: view tracking `read-time-tabs`, tab clicks `read-time-tabs-tab`, promo clicks `read-time-tabs-promo`.
