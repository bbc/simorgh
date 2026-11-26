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
- **¿Qué quieres leer ahora?** and **Desliza para explorar** introduce the stack. Decorative arrows on the action buttons indicate direction. Non-interactive labels over the active card's image fade in proportionally during dragging; they are hidden from screen readers and disappear on release without extra animation.
- Drag/swipe right, click **Leer artículo**, or activate that control with the keyboard to animate right and then navigate. Modified clicks retain normal new-tab/window link behaviour; the headline remains an ordinary link.
- The threshold is 25% of card width, capped at 100px. Smaller movements return to the starting position. Vertical gestures remain page scrolls.
- During a recognised horizontal drag, only the opposite action fades to 55% opacity: **Leer artículo** fades when dragging left, and **No me interesa** fades when dragging right. Both return to full opacity on release; button clicks and vertical scrolling do not trigger fading. Reduced-motion preferences remove the 160ms fade transition. Lightweight decorative arrows indicate the actions without adding screen-reader announcements.
- Only the active card is accessible/focusable. Up to two upcoming cards are inert and hidden from assistive technology, with graduated grey backgrounds and small offsets. Their actual images, counters and headlines remain rendered and visible underneath, revealed naturally as the active card moves in either direction. The next card smoothly moves forward, fading to white, when the current card is dismissed. Card changes are announced.
- The stack holds at most four cards. Once every card has been dismissed, the cards, buttons and **¿Qué quieres leer ahora?** heading are replaced with **¿Quieres seguir explorando?** and a **Más sobre {topic}** link to the original article's first related topic (from `metadata.topics`). Keyboard users dismissing the final card get focus moved to that link. Articles without a topic show **No hay más recomendaciones** instead. Topic pages need the usual internal BFF access when run locally.
- Reduced-motion preferences remove rotation and transition delays.
- The heading and instruction are centred over the 450px stack. Content-sized action buttons are centred underneath with a 16px gap and wrap on narrow screens.
- Dismissal is local to this mounted stack. Reloading, or visiting another article, starts a new stack.

Storybook: `yarn storybook`, then **Components / SwipeableArticleRecommendations / Mundo**. Navigation in Storybook is not an article-page preview; use the application URLs to test destinations.

## Data and navigation

The component accepts the existing `Recommendation[]` shape. Integration selects usable Mundo `/articles/` recommendations from `wsoj.model.data`, deduplicates by path and removes the current article. Missing images, malformed entries and other destinations are ineligible.

If no eligible recommendations exist, a small fixture set uses real headlines/images from the existing local Mundo articles `c206j730722o` and `cddylv9g8z0o`. These are **not personalised recommendations** and may be outdated; approve research content before a study.

URLs are relative so navigation stays on the current local/Test host. After hydration, the current `renderer_env=live`, `test` or `local` override is retained unless a target already specifies its data environment. Absolute live BBC URLs default to `renderer_env=live`. Other current-page query parameters are not copied. Fallback links explicitly select local fixture data on local and live data on Test, so they also work when reached from a page using a different override. Before hydration, relative recommendation links do not inherit a current-page override; a production implementation should resolve this server-side.

## Implementation and removal

Native Pointer Events, card-level pointer capture and a horizontal-intent threshold provide mouse/touch dragging. Descendant capture-loss events are ignored so a touch capture handover from an image cannot cancel the drag. Native image dragging is disabled; vertical touch scrolling and pinch-zoom remain available.

A CSS custom property drives dragging via animation frames; React state tracks the active card and exit phase. A dedicated exit animation's `animationend` event completes dismissal/navigation, not a timeout or snap-back transition. Reduced motion completes immediately, including when enabled mid-animation. Unexpected animation cancellation returns to idle without navigation; pending frames and listeners are cleaned up on unmount.

The containing panel groups the centred stack and controls, capped at 450px. Images use a 16:9 frame capped at 280px high, with cover cropping positioned slightly above centre. A separate white content section holds a muted counter and naturally wrapping headlines, explicitly sized at 18px on mobile and 22px on desktop with 1.3 line height. Up to three rendered cards keep stable keys and use transforms for promotion. Inactive cards sit behind the active card without determining its height; the stack follows the active content rather than retaining a previous card's height. Small 8px/16px layer offsets keep the buttons close. The final topic CTA uses a matching content-height card with translated supporting text and a prominent link, without an image or reserved stack space. No animation dependency is added.

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
