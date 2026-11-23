## Description

Experimental component for the Live page promo experiment on article pages. When Top Stories contains a live page that is currently live, it renders a single promo linking to that live page. Otherwise it renders nothing. The promo is only shown on mobile breakpoints.

It is rendered in the canonical `Navigation` when the server-side Optimizely experiment `newswb_ws_contextual_live_promo` returns the `on` variation. `useShowLivePagePromoExperiment` decides this, and the services and page types are set in `ws-nextjs-app/utilities/experimentHeader/enabledExperimentsList.ts`.

All code for this experiment lives in this directory, so it can be removed by deleting the directory and its usages once the experiment ends.

## Props

| Name   | type           | Description                                                      |
| ------ | -------------- | ---------------------------------------------------------------- |
| blocks | TopStoryItem[] | Array of Top Stories items, used to find an eligible live page.  |

## How to use

```tsx
const showLivePagePromo = useShowLivePagePromoExperiment();

return showLivePagePromo && <LivePagePromoExperiment blocks={blocks} />;
```
