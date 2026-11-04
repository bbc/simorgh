# UserZoom Intercept

Loads the UserZoom Site Intercept script on canonical pages. The script is not
loaded on AMP, App, or Lite pages. Once triggered, it is added using Next.js
Script's `lazyOnload` strategy and receives the request context's nonce when
available.

There are two components for triggering the script:

## UserZoomViewIntercept

Loads the script immediately by default, or when its marker scrolls into view.
For the `view` trigger, place the component at the page position where the
script should be triggered.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` | `'immediate' \| 'view'` | `'immediate'` | When to load the script. |

```tsx
<UserZoomViewIntercept />
<UserZoomViewIntercept trigger="view" />
```

## UserZoomButtonIntercept

Renders a “Give feedback” button and loads the script when the button is
clicked. The button remains visible after the script loads.

```tsx
<UserZoomButtonIntercept />
```
