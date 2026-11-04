# UserZoom Intercept

Loads the UserZoom Site Intercept script on canonical pages. The script is not
loaded on AMP, App, or Lite pages. Once triggered, it is added using Next.js
Script's `lazyOnload` strategy and receives the request context's nonce when
available.

The trigger can be set to load the script immediately, when this component's
marker scrolls into view, or when a referenced element is clicked.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` | `'immediate' \| 'view' \| 'click'` | `'immediate'` | When to load the script. |
| `targetRef` | `RefObject<HTMLElement \| null>` | — | Ref to the clickable element. Required for the `click` trigger. |

## Immediate

The default trigger loads the script when the component mounts:

```tsx
<UserZoomIntercept />
```

## View

Place the component at the page position where the script should be triggered:

```tsx
<UserZoomIntercept trigger="view" />
```

## Click

Pass a ref to an existing element. The component listens for clicks on that
element; it does not render the clickable element itself.

```tsx
const feedbackButtonRef = useRef<HTMLButtonElement>(null);

return (
  <>
    <button ref={feedbackButtonRef} type="button">
      Give feedback
    </button>
    <UserZoomIntercept
      trigger="click"
      targetRef={feedbackButtonRef}
    />
  </>
);
```
