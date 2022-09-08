# Image

## Description

The `Image` component is used to render an image using the correct custom style for for the service. It supports pre-load and lazy loading and can render a placeholder when image is loading. The image component supports webP in the first instance and makes use of jpeg as a fallback format. The image component supports AMP and canonical pages.

## Props

| Name              | type    | Description                                                                                                             |
| ----------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| alt               | string  | the image alt text                                                                                                      |
| src               | string  | the src attribute for the img element                                                                                   |
| primarySrcset     | string  | the primary srcset (probably the webp images)                                                                           |
| primaryMediaType  | string  | the primary image mediaType e.g. "image/webp"                                                                           |
| fallbackSrcset    | string  | the fallback srcset (probably the jpeg images)                                                                          |
| sizes             | string  | the responsive sizes attribute, used in conjunction with srcsets so the browser selects the appropriate image to render |
| fallbackMediaType | string  | the primary image mediaType e.g. "image/jpeg"                                                                           |
| width             | number  | the width attribute for the image element                                                                               |
| height            | number  | the height attribute for the image element                                                                              |
| className?        | string  | this prop is used by Emotion to provide ability to add styles                                                           |
| aspectRatio?      | number  | use this prop if you want to use a custom aspect ratio. useful if you don't have the width and height props             |
| lazyLoad?         | boolean | whether or not the image should lazy load                                                                               |
| preload?          | boolean | whether or not the image should preload                                                                                 |
| placeholder?      | boolean | whether or not to render a placeholder background image                                                                 |
| isAmp?            | boolean | whether or not to render an AMP image                                                                                   |

## How to use

```tsx
<Image
  isAmp={false}
  alt="orange 1"
  src="41BC/test/_63482861_orange1.jpg"
  primarySrcset="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w"
  primaryMediaType="image/webp"
  fallbackSrcset="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w"
  fallbackMediaType="image/jpeg"
  sizes="(max-width: 600px) 480px, 800px"
  width={500}
  height={281}
/>
```

You can generate the `primarySrcset`, `primaryMediaType`, `fallbackSrcset`, and `fallbackMediaType` props using the [`createSrcsets`](../../lib/utilities/srcSet/index.js) function. For example:

```tsx
const src = '41BC/test/_63482861_orange1.jpg';

const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
  createSrcsets({
    originCode: 'cpsdevpb',
    locator: src,
    originalImageWidth: 500,
    imageResolutions: [200, 500, 1000],
  });

<Image
  isAmp={false}
  alt="orange 1"
  src={src}
  primarySrcset={primarySrcset}
  primaryMediaType={primaryMimeType}
  fallbackSrcset={fallbackSrcset}
  fallbackMediaType={fallbackMimeType}
  sizes="(max-width: 600px) 480px, 800px"
  width={500}
  height={281}
/>;
```
