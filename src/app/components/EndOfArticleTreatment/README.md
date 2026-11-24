# EndOfArticleTreatment — Prototype E (WS-3523)

Prototype E combines B's grouped, dark onward-journey area with D's real article
preview. It is a research prototype for stakeholder review and UserZoom, not a
live audience deployment.

## Branch and scope

`WS-3523-prototype-article-end-treatment-option-e` was created from the updated
Option B branch at `5b82403e50`. The preview rendering and extraction are adapted
from the updated Option D branch at `cfa544e8f1`. Neither source branch is changed.

Enabled only for canonical Mundo text articles on local and Test deployments.
The gate uses the actual deployment environment, never `renderer_env` alone.
MAP/SFV, photo galleries, AMP, Lite, App and live audience deployments retain
normal behaviour. There is no BFF change, new dependency or ML model.

## Experience

- A single end statement and heading separate reading from browsing
- The main slot contains a white article preview: photograph, headline, real
  opening text, date and native full-article reading time when available
- The full-article link opens the selected story; selecting a headline changes
  the preview without navigating away
- Up to four text-only choices use journalist-curated Related Content articles
  in their authored order, without numbered format badges
- With one, two or three articles, the next choice is **Explorar BBC Mundo**, so
  there are never more than four choices
- With four articles, all four choices remain articles; advancing beyond the
  last preview offers the homepage fallback without adding a fifth choice
- With no eligible articles, the main slot shows **La historia continúa** and
  an explicit **Explorar BBC Mundo** link; no empty choices or arrows are shown
- The homepage choice displays the fallback first; the reader then chooses
  whether to open the homepage. There is no automatic redirect

The original B grouped sections remain below: Topic Discovery/related topics,
location promos, portrait video, media curation, Top Stories, Features and Most
Read, subject to their existing availability and toggles. The lower Related
Content rail is omitted only when E is active, because its article choices are
now featured above. Any fifth/sixth or non-article links in that rail are therefore
not repeated below. Other discovery sections retain their existing content.

On mobile the treatment stays behind Continue Reading until the article is
expanded. Native horizontal scrolling supports touch swiping; headline buttons
and BBC chevrons provide alternative controls. Buttons expose their selected
state and support arrow keys, Home and End. Every preview has unique IDs and an
ordinary destination link. A polite announcement identifies the selection;
reduced-motion preferences suppress animated scrolling.

The rail stretches cards to a shared natural height without clipping text.
Compact article actions and preview notes align at the bottom of the cards;
image areas align with the headline while keeping the complete image visible.
The homepage panel uses a BBC red-to-dark gradient and a compact destination link.
The white preview has its own dark focus outline; controls on the dark panel
have a light outline. Without JavaScript, the first preview, remaining article
links, homepage link and grouped sections remain available.

## Data

The server adapter is `ws-nextjs-app/pages/[service]/articles/articleEndPreviews/`.
It reads only the first six items in the trailing Related Content block that the
page actually displays, skipping its optional custom heading and retaining
authored order. It excludes
the source article, duplicate IDs, external destinations and identified media.
It takes up to four eligible article links; it does not fill empty slots using
Most Read, topics, in-body links or the older mixed-format adapter.

At most four native article responses are fetched in parallel, each with a
two-second timeout. Excerpts reuse D's extraction: up to two opening paragraphs
and 120 words, favouring complete sentences, with an authored summary fallback.
No generated text, faded text or artificial reading-time estimate is added.
Known MAP/SFV/photo destinations are omitted. On a request failure, the original
curated headline, image and destination remain usable without an invented
excerpt. Failures are logged and degraded results are not cached. Successful
complete selections use a bounded five-minute server cache.

Article links preserve a valid `renderer_env=live` or `renderer_env=test` for
local/Test demonstrations. The homepage action opens the real BBC Mundo homepage.
There is no persisted reading history or claim that selecting a preview means
that the article has been read.

## Run and review

Use the repository Node version, then run the usual development command:

```sh
cd ws-nextjs-app
yarn dev
```

If running the Next workspace directly, align both local origins for BBC players
and the shared SVG icons:

```sh
cd ws-nextjs-app
SIMORGH_BASE_URL=http://localhost.bbc.com:7081 SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN=http://localhost.bbc.com:7081 node ../node_modules/next/dist/bin/next dev -p 7081 --webpack
```

Examples checked against live article data on 24 November 2026:

- **Tariffs: three related articles plus the homepage choice**:
  <http://localhost.bbc.com:7081/mundo/articles/cvg8w6ge2n2o?renderer_env=live>
- **Crimea: another three-article selection**:
  <http://localhost.bbc.com:7081/mundo/articles/cje39lr0v1w7o?renderer_env=live>
- **James Bond: no trailing Related Content, so homepage fallback**:
  <http://localhost.bbc.com:7081/mundo/articles/c64gn38yj4ygo?renderer_env=live>

Content and curation can change. Expand Continue Reading on mobile and scroll to
**Ahora, explora más**. Select a headline, swipe or use the chevrons, then follow
**Leer el artículo completo**. Browser Back returns to the source article.
Storybook under `Components/EndOfArticleTreatment` includes illustrative zero-,
one-, two-, three- and four-article states for visual review.

## Research and production considerations

- Review whether the first curated link represents the strongest next step;
  authored order is preserved but does not prove editorial ranking
- Compare the value of a readable preview with subsequent article opens; a user
  getting value from the preview without clicking is not automatically a failure
- Review overlap with Topic Discovery and the effect of replacing the lower
  Related Content rail with up to four article choices
- Stabilise article selection and review excerpt suitability before a study
- For production, deliver typed previews in the existing BFF response rather than
  hydrating up to four entire articles; measure latency, payload and freshness
- Add proper experiment allocation and exposure/selection measurement before an
  Optimizely experiment; inherited grouped-section tracking needs attribution review
- Verify real devices, keyboard/screen-reader navigation, consent, loading and
  media in the preserved grouped sections before sharing a Test study link

No automated test suites are added or run for this prototype. Manual browser
inspection and scoped formatting, lint and type checks support implementation.
The local Next development server injects SCSS through JavaScript, so disabling
JavaScript leaves these styles unavailable even though the server-rendered links
remain usable. Check the styled no-JavaScript experience on a built Test deployment.
