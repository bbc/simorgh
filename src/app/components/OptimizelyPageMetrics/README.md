## Optimizely Page Metrics

`OptimizelyPageMetrics` is a React component that conditionally tracks metrics such as page views, scroll depth, and page completion.

This component ensures that tracking is only enabled for users who are part of specific Optimizely experiments, and only on supported page types.

The `OptimizelyPageMetric` component:

- Accesses the `Optimizely` client.
- Uses `RequestContext` to determine the current page type (that the `OptimizelyPageMetrics` component is rendered on).
- Finds experiments enabled on current page type in [`experimentsForPageMetrics`](./experimentsForPageMetrics.ts).
- If there are enabled experiments and once Optimizely is ready:
  - Gets all Optimizely experiment decisions
  - For each enabled experiment, loop through Optimizely decisions and check if a user is in any variation.
  - If a user is in a variation, then send Optimizely page metrics and render the page metric components. (Note, it doesn't matter which experiment or variation the user is in, since Optimizely is aware of this based on UserID)
  - If a user is not in a variation, then we return null. Optimizely will not track any metrics.

## Props

| Name              | type    | default | Description                         |
| ----------------- | ------- | ------- | ----------------------------------- |
| trackPageView     | boolean | false   | Enables tracking of page views.     |
| trackPageDepth    | boolean | false   | Enables tracking of scroll depth.   |
| trackPageComplete | boolean | false   | Enables tracking of page completes. |

## experimentsForPageMetrics Array

[`experimentsForPageMetrics`](./experimentsForPageMetrics.ts) is configured so that all Page Metrics are collected for any experiment listed.

For example, say we have 4 experiments running that all want to collect Page Metrics:

- Experiment1: Article and Homepages
- Experiment2: Article and Homepages
- Experiment3: Article and Live pages
- Experiment4: Article pages

The `experimentsForPageMetrics` array would look something like:

```ts
import { ARTICLE_PAGE, HOME_PAGE, LIVE_PAGE } from '#app/routes/utils/pageTypes';
[
    {
        pageType: ARTICLE_PAGE
        activeExperiments: [ Experiment1, Experiment2, Experiment3, Experiment4 ]
    },
    {
        pageType: HOME_PAGE
        activeExperiments: [ Experiment1, Experiment2 ]
    },
    {
        pageType: LIVE_PAGE
        activeExperiments: [ Experiment3 ]
    },
]
```

## How to use

You can use once on a page

```tsx
{
  <OptimizelyPageMetrics trackPageComplete trackPageView trackPageDepth />;
}
```

Or multiple times to invoke different page metrics in different sections of the page

```tsx
{
  <main>
    {/* Track page completes but only within the main section of the page */}
    <OptimizelyPageMetrics trackPageComplete />
  </main>;
  {
    /* Track page views & scroll depth outside the main section of the page */
  }
  <OptimizelyPageMetrics trackPageView trackPageDepth />;
}
```
