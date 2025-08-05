## Description

Each video item in the carousel is rendered using the `PortraitVideoPromo` component. This component is responsible for:

- Displaying the promo image in a 9:16 aspect ratio using the `Image` component.
- Overlaying a headline, play icon, and video duration.
- Handling click and focus events, which:
  - Trigger analytics tracking (both click and view).
  - Call the parent `onClick` to open the video modal.
- Supporting screen reader accessibility via `VisuallyHiddenText` for spoken summaries.
- Ensuring smooth scroll behaviour when focused via keyboard navigation.

It receives the following props internally from `PortraitVideoCarousel`:

| Prop            | Type                      | Description                                             |
| --------------- | ------------------------- | ------------------------------------------------------- |
| `block`         | `PortraitClipMediaBlock`  | The video promo data model including video and images   |
| `blockPosition` | `number`                  | Index of the promo in the carousel, used for tracking   |
| `groupTracker`  | `GroupTracker` (optional) | Analytics metadata for grouping events                  |
| `onClick`       | `() => void` (optional)   | Callback to handle promo click (used to open the modal) |
