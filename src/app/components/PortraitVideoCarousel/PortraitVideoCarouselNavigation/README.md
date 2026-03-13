## Description

This component renders left and right navigation chevron buttons for the `PortraitVideoCarousel`. It enables smooth horizontal scrolling of video promos using native scroll APIs and appears conditionally based on scroll position.

#### Responsibilities

- Provides accessible navigation buttons for horizontal carousel scrolling.
- Automatically detects when the carousel is scrollable in either direction.
- Responds to user interaction to scroll by a fixed item width (`PROMO_ITEM_WIDTH_MIN`).
- Hides buttons when scrolling is not possible in a given direction.
- Updates scroll state dynamically as the user scrolls.

#### Props

| Name            | Type                                  | Description                                                        |
| --------------- | ------------------------------------- | ------------------------------------------------------------------ |
| `scrollPaneRef` | `RefObject<HTMLUListElement \| null>` | Ref to the scrollable carousel `<ul>` element (managed by parent). |

#### Behaviour

- Uses `ServiceContext` to access direction (`ltr`/`rtl`) and translation strings for screen reader accessibility.
- Buttons are visually hidden when scrolling is not possible.
- Scrolls by a constant pixel width (`PROMO_ITEM_WIDTH_MIN`) using smooth scrolling.

#### Accessibility

- Buttons have `aria-label` values sourced from translations.
- Buttons are set to `tabIndex={-1}` and `aria-hidden="true"` because carousel navigation is handled visually rather than via keyboard.
- Component is wrapped in a `<div>` with `aria-hidden="true"` to prevent redundant announcements by screen readers.

#### Example Usage

This component is used internally by `PortraitVideoCarousel`. It is not intended for standalone use.

```tsx
<PortraitVideoCarouselNavigation scrollPaneRef={scrollRef} />
```
