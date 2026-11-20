# EndOfArticlePreview — WS-3523 Option D

A research prototype under WS-3508 that clearly closes the current article and
lets readers sample the beginning of one related article before opening it. A
dark BBC end statement introduces a white editorial panel with the destination's
headline, optional image, short excerpt and onward link. There is no carousel,
automatic navigation, generated text or recommendation engine.

Branch `WS-3523-prototype-article-end-treatment-option-d` starts from the original
prototype at `16aa9f4c13`, after fetching. The original
[EndOfArticleTreatment](../EndOfArticleTreatment/README.md) remains for comparison
but is not rendered by ArticlePage on this branch. Options B and C are not part of
this implementation.

## Scope and data

- Enabled only for canonical Mundo text articles on local and Test deployments.
  MAP/SFV, photo galleries, AMP, Lite, App and live deployments are excluded.
- Appears at the actual article end. On narrow screens, expand the existing
  Continue Reading control first. Existing onward sections remain below it.
- The server adapter prioritises authored Related Content, then article links
  within the body. It accepts Mundo article destinations, removes duplicates and
  the current article, and fetches at most two candidates in parallel with a
  two-second timeout per request. The first valid text article in editorial order
  is selected; no topic feeds or Most Read ranking are used.
- A five-minute cache holds successful selections with excerpts only when neither
  candidate request failed. Failed, missing and excerpt-unavailable results are
  not cached. An authored link does not establish that the selected article is the
  best possible next story.
- Preview copy uses the first two qualifying body paragraphs from the destination,
  up to 120 words, favouring complete sentences. If there are no usable body
  paragraphs, its supplied promo summary is used and labelled as a summary. If
  neither is available, the headline and onward link remain without excerpt text.
  No replacement prose is invented.
- Without a usable preview, the article-end statement and a Mundo homepage link
  remain. The mixed-format prototype's minimum-two-promos rule does not apply.
- Changes are in Simorgh. No BFF changes, new recommendation service or additional
  player dependency are required.

## Run and navigate

From the repository root:

```sh
nvm use
yarn workspace simorgh-nextjs dev
```

Alternatively, run `yarn dev` inside `ws-nextjs-app`. Both start the Next app on
port 7081. `localhost.bbc.com` must resolve to the local machine.

Development examples to review before choosing the study article:

- **Primary preview example — Crimea:** <http://localhost.bbc.com:7081/mundo/articles/cje39lr0v1w7o?renderer_env=live>.
  Its first authored Related Content destination is the Russian billionaires
  story, `c91430j35n5ro`. The adapter attempts that article first in selection
  order; if it is unavailable, the second eligible candidate can be selected.
- **No-selection fallback — James Bond:** <http://localhost.bbc.com:7081/mundo/articles/c64gn38yj4ygo?renderer_env=live>.
  This article has no eligible authored article destinations in the inspected
  data. It demonstrates the end statement and homepage link. No extra demo
  curation is added to fill the gap.
- **Second preview example — tariffs:** <http://localhost.bbc.com:7081/mundo/articles/cvg8w6ge2n2o?renderer_env=live>.
  This selects `cx28y34e8k0o`, the related article about tariffs on Latin American
  countries, with its own photograph, opening paragraphs and reading time.

These are development examples, not an agreed UserZoom study set. The
`renderer_env=live` query selects live article data; it does not enable or publish
the prototype on a live deployment. Available previews can change with the data.

Read or scroll to the end, expanding **Seguir leyendo / Continuar leyendo** on
mobile if necessary. Read the sample, then follow the destination link to open the
full article on the same deployment; a valid `renderer_env=live` or
`renderer_env=test` query is preserved. Ordinary links also work with keyboard
navigation and without JavaScript. Browser Back returns to the source page; the
prototype does not persist a reading position or create an account. Check JavaScript-disabled styling
in a compiled build because Next development mode injects SCSS Modules using
JavaScript.

This work does not deploy the branch. After the normal Test deployment, use
`https://www.test.bbc.com/mundo/articles/<article-id>?renderer_env=live` and verify
participant access and content availability before distributing the URL.

## Storybook and integration

Run `yarn storybook` and open **Components / EndOfArticlePreview**. The stories
cover an article preview, missing image, unavailable excerpt and no selection.
Their copy and reading time are explicitly illustrative, their image is the
local Mundo poster, and their links open the Mundo homepage. They do not represent
a published article or execute an interaction test.

The component accepts `preview?: ArticleEndPreview | null` and an optional
`className`. The type in `types.ts` includes destination identity/title/URL,
optional image and metadata, `paragraphs`, `excerptSource` (`opening`, `summary`
or `unavailable`) and `relationship` (`authored` or `curated`). Keep the displayed
excerpt, headline and destination from the same article. The component does not
fetch or rank content itself. Service copy belongs in Mundo translations and
styles use SCSS Modules with BBC theme tokens.

## Research and productionisation

Observe whether readers recognise that the first article has ended, understand
that the preview belongs to another article, and find enough relevance to decide
whether to continue. This qualitative prototype cannot establish improved weekly
repeat visits. A reader deciding to leave after understanding the offer is still
a valid outcome.

Before an experiment, agree eligibility and measurement; validate editorial
selection, excerpt length and summary labelling; review upstream timeouts,
cache invalidation and fetch cost; and handle changed, removed or restricted
destinations. Confirm image rights/captions and metadata accuracy. Check mobile,
enlarged text, keyboard and screen-reader navigation, and obtain translations
before enabling other services. Existing onward modules may repeat the selected
story; review that duplication as part of the experiment design.

Browser inspection covered the preview at desktop, 375px and 320px widths, the
Bond fallback, keyboard focus and navigation to the full story. At 200% text size,
the preview reflows without clipped text or internal horizontal overflow. Server
HTML includes the excerpt and ordinary destination link without JavaScript.
The live data examples above were checked on 18 November 2026.
The surrounding page has horizontal overflow at 200% text size that persists
when this component is removed; that existing page behaviour is outside this
prototype change. Screen-reader testing remains outstanding.

No automated test suites have been added or run for this option. The component is
alpha; accessibility documentation, acceptance-criteria review and swarm approval
remain incomplete in `metadata.json`.
