## Description

Experimental component for the Live page promo experiment on article pages. When Top Stories contains a live page that is currently live, it renders a single promo linking to that live page. Otherwise it falls back to `TopBarOJs`. Like `TopBarOJs`, the promo is only shown on mobile breakpoints.

All code for this experiment lives in this directory, so it can be removed by deleting the directory and its usages once the experiment ends.

## Props

| Name   | type           | Description                                                      |
| ------ | -------------- | ---------------------------------------------------------------- |
| blocks | TopStoryItem[] | Array of Top Stories items, used to find an eligible live page.  |
| id     | string         | Unique ID for the `TopBarOJs` region landmark when falling back. |

## How to use

```tsx
<LivePagePromoExperiment blocks={blocks} id={id} />
```
