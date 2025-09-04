## Description

`PortraitVideoModal` renders a portrait-oriented video player inside a modal dialog, featuring a close button and full keyboard accessibility. The modal is rendered using `React.createPortal` to ensure it overlays all page content and uses a `<div role="dialog" />` for backdrop support and focus management.

It receives an array of `PortraitClipMediaBlock` objects passed directly from the BFF response and uses the `selectedVideoIndex` prop to determine which video to load initially. Playback and playlist navigation are handled by SMP, using swipable vertical navigation via `MediaLoader`.

## Props

| Name                 | Type                       | Description                                                |
| -------------------- | -------------------------- | ---------------------------------------------------------- |
| `blocks`             | `PortraitClipMediaBlock[]` | Array of raw portrait video blocks as returned by the BFF. |
| `selectedVideoIndex` | `number`                   | Index of the video to display initially in the modal.      |
| `onClose`            | `() => void`               | Callback function triggered when the modal is dismissed.   |

## Usage

```tsx
import PortraitVideoModal from './PortraitVideoModal';
import type { PortraitClipMediaBlock } from '#app/components/MediaLoader/types';

const mockBlock: PortraitClipMediaBlock = {
  type: 'portraitClipMedia',
  model: {
    type: 'video',
    images: [
      {
        source: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8g.jpg',
        urlTemplate:
          'https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01wjx8g.jpg',
      },
    ],
    video: {
      id: 'p01wjx7v',
      title: '1. 4 erros de quem estuda para concursos públicos (9x16)',
      holdingImageURL:
        'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8g.jpg',
      version: {
        id: 'vpid123',
        duration: 'PT13S',
        kind: 'programme',
        guidance: null,
        territories: ['uk', 'nonuk'],
      },
      isEmbeddingAllowed: true,
    },
  },
};

<PortraitVideoModal
  blocks={[mockBlock]}
  selectedVideoIndex={0}
  onClose={() => console.log('Modal closed')}
/>;
```
## Accessibility

- `PortraitVideoModal` provides full keyboard accessibility, it adapts its navigation controls based on the type of device.

## Keyboard Navigation 
- All interactive elements contained within the modal such as (previous button, next button, close button) are fully keyboard accessible. The focus is looped within the modal when open, which allows users to cycle through by pressing tab to go forwards and shift + tab to go backwards. The modal can also be closed by pressing the escape key. 

## Device Specific Navigation

- On desktop, "previous" and "next" navigation buttons are visible and allow users to move through the video playlist using a mouse click or keyboard. 

- On mobile, "previous" and "next" buttons are available, but at 600px and above they are disabled and replaced with our own custom controls. A user can swipe vertically to navigate between the video playlist if buttons are not desired.

## Close Button

The close button is always keyboard and mouse accessible on desktop, however it is visually hidden on mobile to utilise screen space. It remains available to screen readers and keyboard users.

On mobile devices that are under 600px, the visibile close button is provided by the in-player SMP controls, not our custom modal ones for desktop. This ensures there is always a way to close the video, even when our custom close button is visually hidden.

On desktop, 600px and above, the in player close button is disabled and users can interact with our custom close button instead.

# Navigation Button Logic

Whether the navigation button is enabled or disabled state is dependent on the current position of the video within the playlist. The "previous" button is disabled on the first video and the "next" button is disabled when on the last video. This logic is handled after the playlist loads, using the `playlistLoadedCallback` event.

# Known UI Issue

Upon initial load, if selecting the first video in which case the "previous" button should be disabled, the "previous" button may appear to be enabled for a split second. This is due to the button's enabled state being set only after the playlist loads. Setting the button to disabled initially can create inconsistencies with synchronization between the DOM and React's virtual DOM. Although it seems like the button is enabled we still cannot click it, so this minor bug is accepted.

# Vanilla JS/TS for DOM

While React hooks like 'useRef' are more idiomatic, we used `document.getElementById` for simplicity as without it, can sometimes lead to unnecessary complexity such as prop-drilling and using `.current`. So we went with the approach of giving the button an id and selecting it directly keeping the code simple and less abstract.



