# EndOfArticleTreatment — WS-3523 prototype

Research prototype under WS-3508. Makes the end of a standard Mundo article
explicit and groups mixed-format recommendations and existing onward journeys
inside one article-end treatment.
It is enabled on **local and Test deployments only**, for canonical Mundo text
articles. MAP/SFV, photo galleries, AMP, Lite, App and live deployments are excluded.
The entire treatment is hidden when fewer than two promos are available.
No BFF change, recommendation service, new dependency or live deployment is needed.

## Option B: grouped onward journeys

This version is on `WS-3523-prototype-article-end-treatment-option-b`, branched
from `WS-3523-prototype-article-end-treatment` at `16aa9f4c13`. Use the original
branch to compare Option A at the same article URLs below.

The mixed-format cards stay first. Below them, a dark surface inside the same
boundary contains Topic Discovery (or related-topic links), location-based
promos, the portrait carousel, Related Content and video curation when available.
Top Stories and Features move from the desktop sidebar into this group, followed
by Most Read. Existing headings, links, controls, data and toggle conditions are
retained; these sections are moved, not duplicated. The treatment spans the
normal page width beneath the article, while the article keeps its reading width.
Features use three columns on desktop, two on tablet and one on mobile, rather
than stretching their original sidebar layout across the panel. Existing dark-UI
styles are enabled only for the grouped sections (the legacy theme context and
the SCSS dark-UI marker); the new layout and colour overrides remain in SCSS.

On mobile the entire group waits until Continue Reading is expanded. If the
treatment is ineligible or has fewer than two mixed-format promos, the existing
page layout is retained. Without JavaScript, the ordinary links and supported
onward sections remain available. This layout comparison does not force users
to choose a promo or prevent them from leaving the page.

The panel and inline player use co-located SCSS Modules, BBC theme tokens and
flex layouts. Shared Heading, Image, icon and MediaLoader overrides are scoped
to this component with explicit specificity. ArticlePage's collapsed-article
visibility override also uses a module; Storybook supplies the Mundo SCSS theme.
The fixed media frame and mobile card peek retain their sizes when text is enlarged.

## Load locally

Use the repository Node version (`nvm use` from the repository root). Normally
start with `yarn workspace simorgh-nextjs dev`. If the existing dependency state
reports `next: command not found`, the installed CLI can be started directly:

```sh
cd ws-nextjs-app
yarn setupDevEnv
SIMORGH_BASE_URL=http://localhost.bbc.com:7081 SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN=http://localhost.bbc.com:7081 node ../node_modules/next/dist/bin/next dev -p 7081 --webpack
```

`localhost.bbc.com` must resolve to `127.0.0.1` for BBC player development; it
already does on the development machine used for this prototype. See the existing
[MediaLoader instructions](../MediaLoader/README.md) for other machines.

For prototype demos, a temporary development-only header in `next.config.js`
allows cross-origin requests to `/images/icons/*`. Normal `yarn dev` serves these
shared SVG masks from `localhost`, while SMP demos use `localhost.bbc.com`.
This mismatch also blocks carousel icons on `latest`; it is not introduced by
this component's SCSS migration. The explicit startup command above aligns both
hosts and avoids the mismatch. Remove the workaround once local asset origins
are aligned; it does not apply to production builds, including Test deployments.

- **Fixed portrait-video development example:** <http://localhost.bbc.com:7081/mundo/articles/cwe9k0d7x9z0o?renderer_env=live>
- **Landscape video example:** <http://localhost.bbc.com:7081/mundo/articles/c77mp3nkjr2o?renderer_env=live>
- **General selection example:** <http://localhost.bbc.com:7081/mundo/articles/c64gn38yj4ygo?renderer_env=live>
- **Automatic four-format example (linked from the Mundo homepage on 17 November):** <http://localhost.bbc.com:7081/mundo/articles/cje39lr0v1w7o?renderer_env=live>
- Other standard articles: use their `/mundo/articles/<id>` path on the same local
  host with `?renderer_env=live`. The query selects live BBC content; it does **not**
  enable the prototype on a live deployment or publish changes.

These are development examples, not an agreed list of UserZoom study material.
The prototype is available across eligible Mundo articles as requested; that does
not prescribe which article participants should see. Choose the research article
and a stable relevant selection separately before the study.

The first article concerns the Epstein forensic report. Its three fixed promos
are a related portrait clip, a related text article and the Epstein topic. They
are broader coverage of the same subject, not all direct follow-ups to that report.
The landscape example concerns Chernobyl's radiation shield. It offers the related
29-minute BBC Chernobyl documentary, an authored related article and the nuclear
energy topic. The James Bond article demonstrates the automatic fallback; its
shared entertainment topics produce broader recommendations.

On narrow screens, select the article's existing **Seguir leyendo / Continuar
leyendo** control first. Read or scroll to the genuine end. The dark panel says
**Has llegado al final del artículo / Ahora, explora más**. Swipe the cards, use
previous/next buttons, or choose any visible headline. Arrow/Home/End keys also
work on headline choices. Navigation stops at each end; nothing advances itself.
Mobile shows the actual edge of the adjacent card, with native scrolling and
scroll snap. All cards share the same media-frame height and stretch to the
tallest text content at that viewport width, so changing cards does not move the
controls. Headlines remain complete, including with enlarged text. The smaller
end statement is a paragraph; the section title is H2 and promo titles are H3.
Unselected headline choices use BBC black, a white outline and a BBC red bottom
edge matching the section accent. The selected choice has a white background and
dark text as well as `aria-pressed`; selection does not rely on the red accent.

The active media card shows the native BBC player in its paused state as the
article-end panel approaches the viewport. Use its Play control to begin playback;
there is no separate **Ver aquí** step or autoplay. The poster and player share a
black surround. **Ir a la página** is a boxed destination link beneath the content,
and remains available if playback is unavailable. Only the selected card mounts a
player, and the panel stays inactive while the article is collapsed behind
Continue Reading. Changing cards pauses and unmounts the player.
Article/topic links lead to their normal BBC pages. Browser Back returns to the
prototype. Without JavaScript, ordinary destination links remain available.

The prototype also enables the existing Topic Discovery section for these pages
when local fixture toggles omit it, so the intended placement can be reviewed.
Existing related-content and portrait sections retain their normal toggles within
the grouped treatment.

## Test and research handover

This branch has not been deployed. After the normal Test deployment, the selected
article can be accessed at `https://www.test.bbc.com/mundo/articles/<article-id>?renderer_env=live`.
Verify participant access, cookies/consent, media rights/availability and playback
on the actual study devices before sharing it. Localhost is not a participant URL.
Storybook examples are under `Components/EndOfArticleTreatment`.

Ask participants where the article ends, what they expect the card choices to do,
and whether they can choose and consume another item. Observe swipe discovery,
visible-title scanning, playback and the transition to Topic Discovery. This
qualitative prototype cannot establish an increase in weekly repeat visits.

## Data selection

The server adapter is `ws-nextjs-app/pages/[service]/articles/articleEnd/`:

1. Two development examples have fixed selections in `studyCurations.json`, read
   on 17 November 2026 from the Epstein topic and the Chernobyl source's authored
   links/related documentary. Topic artwork comes from each topic page's leading
   promo, with the topic name over the existing BBC red treatment. The image
   represents the topic's coverage, not necessarily the source article. Retain the media block's
   guidance, availability and native player metadata. These are live assets,
   therefore the override is used only when fetching live content.
2. Other articles use authored Related Content and link blocks first, then at most
   three existing feeds for their non-geographic metadata topics, preserving tag
   order. The preferred topic is an event, then another subject, then a person.
   For that topic, read up to 24 summaries from the first page of its last NORMAL
   vivo-stream curation, matching Topic Discovery's choice of main stream. This
   can find media below the four items returned by Topic Discovery. The other
   topics use the smaller Topic Discovery feeds; the preferred topic also falls
   back to that smaller feed if its full page is unavailable. Other promotional
   curations and further pages are excluded. The topic card's image comes from
   that exact topic's leading promo. This is a transparent heuristic, not semantic
   matching or personalisation. Broader topic recommendations are labelled as
   context, rather than implied to be coverage of the exact same incident.
3. Self-links and repeated content IDs are excluded. At most two candidate media
   pages are fetched in parallel to obtain native media blocks. Where an eligible
   candidate's ID matches a portrait clip already delivered in the page's carousel,
   reuse that native media block instead. The general carousel alone does not
   establish relevance, so unrelated clips are not added. At most one item per format
   is selected, with a maximum of four; a source topic can fill one slot.
4. Fetches time out after two seconds; successful results have a bounded five-minute
   server cache. Failed or malformed discovery responses are distinguished from
   successful empty feeds and logged. A degraded topic or media fetch prevents
   caching the combined selection, so the next request can retry. If media hydration
   fails, retain the real destination link. With fewer than two promos, hide the
   entire treatment; no empty panel or single-card fallback is rendered.

A portrait-format image alone does not establish that content is a portrait video.
The native media version's orientation determines that distinction: SFV metadata
can also be present on landscape media pages. Some legacy
MAP URLs use `/articles/`; without typed topic metadata their format cannot be
identified cheaply, so they remain link-only. Portrait and landscape on-demand
video playback are verified; audio and live journeys are not verified. Dedicated
live/radio page fetching is not implemented. The single-item player preserves native
plugins, including Dazzler where supplied, and removes only the portrait modal's
fullscreen launcher. Preserving that configuration does not verify live playback:
live content/environment selection and a real stream still need checking.
The presence of a format label does not mean its full journey is implemented.
No stream is fabricated to fill a slot. Broad topics can produce
weak matches, so review and stabilise the chosen research selection rather than
assuming every automatically populated page has editorial-quality recommendations.

For the automatic Crimea example, the billionaires article is the source's first
authored Related Content link. The Russia–Ukraine conflict feed supplies the Crimea
attack video, whose native portrait block is already present in the page's carousel.
The same topic's fuller feed supplies the landscape video `cm0e0d35zlwjo`, about
Russian informants and sabotage, with native MAP playback. That is wider conflict
context, not footage of the bridge attack. The event topic becomes the fourth card.
These are existing editorial/tag relationships; this article has no fixed study
override and does not use Most Read to select cards. Four cards are possible, not
guaranteed: feeds change and a page may lack enough distinct relevant formats.

## Productionisation considerations

- Option B preserves existing section tracking metadata despite changing placement.
  Review attribution and exposure measurement before using the grouped layout in
  an experiment. The longer, full-width onward area is an exploratory layout for
  team comparison, not a validated improvement over Option A.
- Establish editorial ownership: a dedicated Tipo curation or explicit related
  content relationship should replace the study fixture and broad-topic heuristic.
  Ideally the BFF returns a typed, deduplicated selection with media metadata in one
  response. Do not add a new recommendation engine merely to ship the treatment.
- Reconcile overlapping items with Topic Discovery, Related Content and the existing
  portrait carousel. The prototype does not remove authored links elsewhere. Trailing
  ads/injected blocks stay in their existing positions; the panel follows the complete
  article block stream, including endings made of images or media.
- Choose a proper feature flag/experiment allocation and an eligible population.
  Current guards use the actual deployment environment, not a URL override. Add
  experiment exposure, selection and playback measurements before Optimizely use;
  a panel impression does not demonstrate reading or understanding.
- Review service copy, source relevance, media dates/rights, content guidance,
  international playback, accessibility and performance. Only Mundo translations
  are supplied. Keep card selection separate from rendering for other services.
- Existing MediaLoader is reused with an opt-in single-item mode. Cleanup now pauses
  its own player and cancels delayed setup on unmount; regression tests cover that
  shared change. Test ads, captions, fullscreen and all supported media/device
  combinations before production. No autoplay or swipe-to-like/dislike is added.
- Extra server requests and the fixed live assets are deliberate spike shortcuts.
  Production needs measured latency, caching/invalidation and defined failure states.
  The 24-summary cap is applied after fetching a full topic response: its upstream
  work may include more content, so a purpose-built bounded BFF response would be
  preferable for an experiment. Normally there are at most three topic requests
  and two media-page requests; a failed full-topic fetch adds its smaller fallback.

## Verification

The visual refinement is checked manually in the browser and with an accessibility
scan; no automated test suite is required for this prototype. Review 320px, 375px
and desktop layouts, enlarged text, complete headlines, stationary controls when
changing cards, no-JavaScript links, keyboard focus and the true-end boundary.
Check both portrait and landscape playback and pause-on-card-change. Earlier
shared-player and server-guard checks remain in the repository. These checks do
not replace the Test/device checks above.

The refinement was inspected at mobile and desktop widths, including 320px with
200% text. Cards retain full headlines and actions without overflowing; card
selection and playback keep the panel height stable. Native touch swipe,
keyboard selection, portrait/landscape playback, seeking and pause-on-card-change
were checked. The panel's WCAG A/AA accessibility scan reported no violations.
At 200% text the surrounding page already has horizontal overflow, reproducible
with this panel removed; the prototype's cards stay within their own bounds.
