# Description

Spike-only component that loads the UserZoom Site Intercept script on canonical pages. The script is excluded on AMP, Lite and App, and can be loaded immediately, on scroll-into-view, or on click of a target element.

| Parameter | type                            | example                      |
| --------- | ------------------------------- | ---------------------------- |
| trigger   | `'immediate' \| 'view' \| 'click'` | `"immediate"` (default)    |
| targetRef | `RefObject<HTMLElement \| null>`   | ref to a clickable element (required for `'click'` trigger) |
