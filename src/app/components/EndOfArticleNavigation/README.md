# EndOfArticleNavigation — WS-3523 Option C

A compact article-end navigation prototype for WS-3523 under epic WS-3508.
It marks the end of a standard Mundo article and asks **¿Qué te gustaría hacer
ahora?**, then directs readers to useful sections already on the page or to the
BBC Mundo homepage. It uses a dark treatment with a BBC red top edge and text
links, without a promo carousel or embedded media.

This option lives on `WS-3523-prototype-article-end-treatment-option-c`, created
from the original prototype branch after pulling commit `16aa9f4c13`. It does
not include Option B's enclosing layout for all onward sections. The original
[EndOfArticleTreatment](../EndOfArticleTreatment/README.md) remains in the
repository for comparison but is not rendered by ArticlePage on this branch.

## Scope and behaviour

- ArticlePage enables the treatment for canonical Mundo text articles on local
  and Test deployments. MAP/SFV, photo-gallery, AMP, Lite, App and live deployment
  routes are excluded.
- On narrow screens, the panel stays hidden while the article is collapsed behind
  its existing Continue Reading control. It appears at the actual article end
  after the reader expands the article.
- The panel links to available onward sections in their page order: Topic
  Discovery, portrait videos, Related Content and Most Read. Country and media
  curations are also included when available. These are navigation choices, not a
  new set of recommendations. Top Stories and Features are excluded because their
  desktop placement can be alongside or above the article end.
- JavaScript-dependent destinations are omitted until the component hydrates.
  Destinations marked as unavailable in Opera Mini are omitted there too.
- When fewer than two usable destinations remain, the panel also offers the
  Mundo homepage. With no usable destinations, it contains one homepage link.
  The original carousel's minimum-two-promos visibility rule does not apply.
- Existing onward sections keep their established position and layout outside
  this panel. The local/Test Topic Discovery enabling behaviour inherited from
  the original prototype is retained.

Option C does not use `articleEndItems` or its fixed study curations. The route no
longer invokes the original prototype's extra recommendation adapter, so this
option adds no topic-feed or media-enrichment requests. Existing page data and
ordinary onward-section requests continue to work as before. No BFF changes,
recommendation service or new dependencies are required.

## Run and navigate

Use the repository Node version and start the Next app from the repository root:

```sh
nvm use
yarn workspace simorgh-nextjs dev
```

The workspace script uses port 7081. If its `next` executable is unavailable in
the current dependency state, use the installed CLI:

```sh
cd ws-nextjs-app
yarn setupDevEnv
SIMORGH_BASE_URL=http://localhost.bbc.com:7081 SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN=http://localhost.bbc.com:7081 node ../node_modules/next/dist/bin/next dev -p 7081 --webpack
```

Open either development example:

- <http://localhost.bbc.com:7081/mundo/articles/cje39lr0v1w7o?renderer_env=live>
- <http://localhost.bbc.com:7081/mundo/articles/c64gn38yj4ygo?renderer_env=live>

`localhost.bbc.com` must resolve to the local machine. The explicit startup
command aligns the asset and page origins; the inherited development-only icon
CORS workaround also supports the normal workspace command. `renderer_env=live`
selects live article data; it does not publish the prototype or enable it on a
live deployment. These examples are for development, not an agreed UserZoom
study selection.

On mobile, expand **Seguir leyendo / Continuar leyendo**, then reach the article
end. Choose one of the available sections to jump down the same page. The exact
choices depend on the article's onward content. **Explorar BBC Mundo**, when
offered, opens the real Mundo homepage. Use Tab and Enter to follow the same links
with a keyboard.

The in-page links retain real fragment URLs. For ordinary JavaScript-enabled
activation, the component prevents native fragment navigation, moves focus to the
target and scrolls it into view with an offset for the measured navigation
height. This does **not** change the URL, hash or browser history. Modified clicks
retain native link behaviour. Without JavaScript, links to usable static sections
use ordinary fragment navigation; JavaScript-dependent choices stay absent and
the homepage fallback remains available when needed. Validate no-JavaScript
presentation in a compiled build: Next development mode injects SCSS-module styles
through JavaScript.

## Storybook

Run `yarn storybook` from the repository root and open
**Components / EndOfArticleNavigation**:

| Story                | Destinations                                                                       |
| -------------------- | ---------------------------------------------------------------------------------- |
| AllAvailableSections | Four actual headings: Topic Discovery, portrait videos, Related Content, Most Read |
| HomepageFallback     | Most Read heading and the real Mundo homepage                                      |
| HomepageOnly         | One real Mundo homepage link                                                       |

The stories supply the Mundo service, request and both theme providers. Their
fragment destinations are actual focusable Heading components so the jump and
keyboard-focus behaviour can be demonstrated. Homepage links leave the Storybook
preview. The fixtures are demonstrations, not automated interaction tests.

## Integration contract

Pass `destinations: ArticleEndDestination[]` in page order. Each entry contains
`id`, `label` and `description`, with optional `requiresJs` and `hideInOperaMini`
flags. An optional `className` supports the ArticlePage layout. The destination
list must reflect sections that are actually rendered, including their service
toggles, usable content and browser support. The component filters the supplied
flags and appends the homepage fallback when fewer than two usable choices remain.

The type and target constants are exported from `types.ts`; target constants are
also re-exported by the component:

- `TOPIC_DISCOVERY_TARGET`: `topic-discovery-heading`
- `PORTRAIT_VIDEO_TARGET`: `article-portrait-video-carousel`
- `RELATED_CONTENT_TARGET`: `section-label-heading-related-content-heading`
- `MOST_READ_TARGET`: `section-label-heading-Most-Read`
- `COUNTRY_CURATION_TARGET`: `location-based-topic-oj`
- `MEDIA_CURATION_TARGET`: `article-onward-media`

Destination headings or section targets need `tabIndex={-1}` and the scoped
ArticlePage target styles for focus and scroll offset. Keep destination checks and
IDs aligned when changing the existing sections. Spanish copy is in
`mundo.ts` under `translations.endOfArticleNavigation`; layout rules use SCSS
Modules and BBC theme tokens.

## Research and productionisation

This is a research prototype, not a live audience deployment. Before sharing a
Test URL, choose the study article, verify participant access and confirm that its
destinations still exist. A Test deployment would use
`https://www.test.bbc.com/mundo/articles/<article-id>?renderer_env=live` through the
normal deployment process; this branch has not been deployed by this work.

Observe whether readers recognise the article ending, understand the available
choices and reach the intended section. Qualitative findings cannot establish an
increase in weekly repeat visits.

Before an Optimizely experiment or wider rollout:

- Replace the prototype-only environment/service gate with an agreed experiment
  flag and define exposure and destination-click measurement.
- Keep link availability aligned with section rendering, asynchronous data and
  future changes to generated heading IDs; retain a useful homepage fallback.
- Review the Spanish copy editorially and obtain translations before enabling
  other services. Check RTL layout as well as long labels and enlarged text.
- Review keyboard, screen-reader, sticky-navigation and browser-history behaviour
  on supported browsers. Check enhanced navigation without URL changes alongside
  native fragment fallback in JavaScript-disabled builds and modified clicks.
- Assess whether jumping over intervening sections helps readers and whether
  the available sections meet the research need for onward navigation without
  overwhelming readers with choices.

No automated test suites have been added or run for this option. Accessibility
documentation, acceptance-criteria review and swarm approval are not complete;
`metadata.json` marks the component as alpha and leaves those statuses false.
