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

This is how to render a basic image (non-responsive):

```tsx
<Image
  alt="A penguin stands on an ice floe"
  src="https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
  width={500}
  height={281}
/>
```

This is how to render a responsive image:

```tsx
<Image
  alt="A penguin stands on an ice floe"
  src="https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
  srcSet="https://ichef.bbci.co.uk/news/240/cpsprodpb/164AF/production/_110911319_antartica.jpg 240w, https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg 624w"
  sizes="(min-width: 1008px) 645px, 100vw"
  width={500}
  height={281}
/>
```

This is how to render a basic webp image with jpeg fallback (non-responsive):

```tsx
<Image
  alt="A penguin stands on an ice floe"
  src="https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
  srcSet="https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp"
  mediaType="image/webp"
  fallbackSrcSet="https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
  fallbackMediaType="image/jpeg"
  width={500}
  height={281}
/>
```

This is how to render a responsive webp image with a jpeg fallback:

```tsx
<Image
  alt="A penguin stands on an ice floe"
  src="https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
  srcSet="https://ichef.bbci.co.uk/news/240/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp 240w, https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp 624w"
  mediaType="image/webp"
  fallbackSrcSet="https://ichef.bbci.co.uk/news/240/cpsprodpb/164AF/production/_110911319_antartica.jpg 240w, https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg 624w"
  fallbackMediaType="image/jpeg"
  sizes="(min-width: 1008px) 645px, 100vw"
  width={500}
  height={281}
/>
```

You can generate the `srcSet`, `mediaType`, `fallbackSrcSet`, and `fallbackMediaType` props using the [`createSrcsets`](../../lib/utilities/srcSet/index.js) function. For example:

```tsx
const src =
  'https://ichef.bbci.co.uk/news/624/cpsprodpb/164AF/production/_110911319_antartica.jpg';

const { srcSet, primaryMimeType, fallbackSrcSet, fallbackMimeType } =
  createSrcsets({
    originCode: 'cpsprodpb',
    locator: src,
    originalImageWidth: 500,
    imageResolutions: [200, 500, 1000],
  });

<Image
  isAmp={false}
  alt="A penguin stands on an ice floe"
  src={src}
  srcSet={srcSet}
  mediaType={primaryMimeType}
  fallbackSrcSet={fallbackSrcSet}
  fallbackMediaType={fallbackMimeType}
  sizes="(min-width: 1008px) 645px, 100vw"
  width={500}
  height={281}
/>;
```
