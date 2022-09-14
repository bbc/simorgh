# Image

## Description

The `Image` component is used to render an image. It supports responsive images, fallback images (e.g. jpeg when webp is not supported), preloading, lazy loading, placeholder images and AMP images.

## Props

| Name               | type    | Description                                                                                                             |
| ------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| alt                | string  | the image alt text                                                                                                      |
| src                | string  | the src attribute for the img element                                                                                   |
| srcSet?            | string  | the primary srcset (probably the webp images)                                                                           |
| mediaType?         | string  | the primary image mediaType e.g. "image/webp"                                                                           |
| fallbackSrcSet?    | string  | the fallback srcset (probably the jpeg images)                                                                          |
| sizes?             | string  | the responsive sizes attribute, used in conjunction with srcsets so the browser selects the appropriate image to render |
| fallbackMediaType? | string  | the primary image mediaType e.g. "image/jpeg"                                                                           |
| width?             | number  | the width attribute for the image element                                                                               |
| height?            | number  | the height attribute for the image element                                                                              |
| className?         | string  | this prop is used by Emotion to provide ability to add styles                                                           |
| aspectRatio?       | number  | use this prop if you want to use a custom aspect ratio. useful if you don't have the width and height props             |
| lazyLoad?          | boolean | whether or not the image should lazy load                                                                               |
| preload?           | boolean | whether or not the image should preload                                                                                 |
| placeholder?       | boolean | whether or not to render a placeholder background image                                                                 |
| isAmp?             | boolean | whether or not to render an AMP image                                                                                   |

## How to use

This is how to render a basic image:

```tsx
<Image
  alt="orange 1"
  src="https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg"
  width={500}
  height={281}
/>
```

This is how to render a responsive image:

```tsx
<Image
  alt="orange 1"
  src="https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg"
  srcSet="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w"
  sizes="(max-width: 600px) 480px, 800px"
  width={500}
  height={281}
/>
```

This is how to render a responsive webp image with a jpeg fallback:

```tsx
<Image
  alt="orange 1"
  src="https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg"
  srcSet="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg.webp 500w"
  mediaType="image/webp"
  fallbackSrcSet="https://ichef.bbci.co.uk/news/200/cpsdevpb/41BC/test/_63482861_orange1.jpg 200w, https://ichef.bbci.co.uk/news/500/cpsdevpb/41BC/test/_63482861_orange1.jpg 500w"
  fallbackMediaType="image/jpeg"
  sizes="(max-width: 600px) 480px, 800px"
  width={500}
  height={281}
/>
```

You can generate the `srcSet`, `mediaType`, `fallbackSrcSet`, and `fallbackMediaType` props using the [`createSrcsets`](../../lib/utilities/srcSet/index.js) function. For example:

```tsx
const src = '41BC/test/_63482861_orange1.jpg';

const { srcSet, primaryMimeType, fallbackSrcSet, fallbackMimeType } =
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
  srcSet={srcSet}
  mediaType={primaryMimeType}
  fallbackSrcSet={fallbackSrcSet}
  fallbackMediaType={fallbackMimeType}
  sizes="(max-width: 600px) 480px, 800px"
  width={500}
  height={281}
/>;
```
