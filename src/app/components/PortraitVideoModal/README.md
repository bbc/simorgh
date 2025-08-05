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
