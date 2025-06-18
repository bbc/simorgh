## Description

`PortraitVideoModal` renders a portrait-oriented video player inside a modal dialog, featuring a close button. The modal leverages the native `<dialog>` element for backdrop support and is rendered using `React.createPortal` to ensure it overlays all page content.

## Props

| Name               | Type                        | Description                                                              |
|--------------------|-----------------------------|--------------------------------------------------------------------------|
| items              | PortraitVideoModalProps[]    | Array of video metadata objects, passed to the MediaLoader component.    |
| selectedVideoIndex | number                      | Index of the selected video to display in the modal.                     |
| onClose            | () => void                  | Callback invoked when the modal close button is activated.               |

## Usage

```tsx
<PortraitVideoModal
  items={[
    {
      id: 'urn:bbc:pips:pid:p01wjx7v',
      images: [
        {
          url: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01wjx8g.jpg',
          urlTemplate: 'https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01wjx8g.jpg',
          altText: 'A sensação de não saber por onde começar, a falta de uma rotina',
        },
      ],
      headlines: {
        promoHeadline: '1. 4 erros de quem estuda para concursos públicos (9x16)',
      },
      link: {
        path: '/programmes/p01wjx7v',
      },
      video: {
        id: 'p01wjx7v',
        version: {
          duration: 'PT13S',
          kind: 'programme',
          territories: ['uk', 'nonuk'],
        },
      },
    },
  ]}
  selectedVideoIndex={0}
  onClose={() => { console.log('Modal closed'); }}
/>
```
