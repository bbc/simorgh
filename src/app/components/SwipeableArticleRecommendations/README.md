# Swipeable article recommendations

Research-only Mundo prototype accompanying the [clear article end treatment](../ArticleEnd/README.md). No live audience deployment or preference saving is included.

## Access and behaviour

Run `yarn workspace simorgh-nextjs dev` from the repository root, then open:

- http://localhost:7081/mundo/articles/cv6n0064n5vo
- http://localhost:7081/mundo/articles/cwe9k0d7x9z0o?renderer_env=live
- http://localhost:7081/mundo/articles/c64gn38yj4ygo?renderer_env=live

The last two URLs need the usual internal BFF/network configuration. After deploying a Test build, use the same paths on `https://www.test.bbc.com`.

Scroll to **FIN DEL ARTÍCULO**, expanding Continue reading if present. The stack appears directly after that unchanged divider on canonical Mundo articles in local/Test, including previews configured as Test. AMP, Lite, app and Live are unchanged.

- Drag/swipe left or select **No me interesa** to dismiss.
- Drag/swipe right, click **Leer artículo**, or activate that control with the keyboard to animate right and then navigate. Modified clicks retain normal new-tab/window link behaviour; the headline remains an ordinary link.
- The threshold is 25% of card width, capped at 100px. Smaller movements return to the starting position. Vertical gestures remain page scrolls.
- Only the active card is accessible/focusable. The next card is inert and hidden from assistive technology; it smoothly moves forward when the current card is dismissed. Card changes are announced, and exhaustion displays **No hay más recomendaciones**.
- Reduced-motion preferences remove rotation and transition delays.
- Dismissal is local to this mounted stack. Reloading, or visiting another article, starts a new stack.

Storybook: `yarn storybook`, then **Components / SwipeableArticleRecommendations / Mundo**. Navigation in Storybook is not an article-page preview; use the application URLs to test destinations.

## Data and navigation

The component accepts the existing `Recommendation[]` shape. Integration selects usable Mundo `/articles/` recommendations from `wsoj.model.data`, deduplicates by path and removes the current article. Missing images, malformed entries and other destinations are ineligible.

If no eligible recommendations exist, a small fixture set uses real headlines/images from the existing local Mundo articles `c206j730722o` and `cddylv9g8z0o`. These are **not personalised recommendations** and may be outdated; approve research content before a study.

URLs are relative so navigation stays on the current local/Test host. After hydration, the current `renderer_env=live`, `test` or `local` override is retained unless a target already specifies its data environment. Absolute live BBC URLs default to `renderer_env=live`. Other current-page query parameters are not copied. Fallback links explicitly select local fixture data on local and live data on Test, so they also work when reached from a page using a different override. Before hydration, relative recommendation links do not inherit a current-page override; a production implementation should resolve this server-side.

## Implementation and removal

Native Pointer Events, card-level pointer capture and a horizontal-intent threshold provide mouse/touch dragging. Descendant capture-loss events are ignored so a touch capture handover from an image cannot cancel the drag. Native image dragging is disabled; vertical touch scrolling and pinch-zoom remain available.

A CSS custom property drives dragging via animation frames; React state tracks the active card and exit phase. A dedicated exit animation's `animationend` event completes dismissal/navigation, not a timeout or snap-back transition. Reduced motion completes immediately, including when enabled mid-animation. Unexpected animation cancellation returns to idle without navigation; pending frames and listeners are cleaned up on unmount.

The containing panel groups the stack and controls. The two rendered cards keep stable keys, overlap in a flex layout and use transforms for promotion. Stack height is retained across dismissals to avoid shrinking during the handover, and recalculated when the available width changes. No animation dependency is added.

The integration is a separate synthetic block immediately after the divider in `ArticlePage`. Remove that block, its imports/renderer mapping, this directory and the associated translation to remove the spike. Existing recommendation sections are not replaced.

## Productionisation risks

- Replace the prototype gate with approved experiment eligibility, control, kill switch and consistent server/client assignment.
- Define editorial end placement and recommendation sourcing, freshness, deduplication across existing sections, image rights and empty/error states. Fixture fallback is for research only.
- Validate eligible target URLs and resolve data-environment routing on the server. Existing onward links elsewhere still follow their original destinations.
- No analytics or preference storage is added. Define exposure, dismissal, navigation and completion metrics before experimentation.
- Confirm Spanish copy, screen-reader announcements and focus behaviour with accessibility reviewers. Test touch scroll/pinch-zoom, pointer cancellation, keyboard, reduced motion, narrow widths and zoom on actual devices.
- Only the LTR Mundo canonical experience is in scope. Agree RTL gestures, AMP/Lite/app and no-JavaScript behaviour before wider rollout.
- Existing mid-article/related content remains visible and can repeat recommendations. The changed article height affects scroll-depth metrics.

## Tests

```sh
NODE_OPTIONS=--experimental-vm-modules yarn jest --selectProjects='Unit Tests' --runInBand --runTestsByPath src/app/components/SwipeableArticleRecommendations/index.test.tsx src/app/components/ArticleEnd/index.test.tsx src/app/pages/ArticlePage/index.test.tsx
```
