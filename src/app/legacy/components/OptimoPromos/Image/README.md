# Promo Image

## Description

A component that uses the canonical Image component and adds styling to preserve
the required aspect ratio.

## Props

| Name           | type    | Description                                                        |
| -------------- | ------- | ------------------------------------------------------------------ |
| src            | string  | image url                                                          |
| altText        | string  | text description of the image                                      |
| srcset         | string  | possible image sources with different sizing for responsive images |
| fallbackSrcset | string  |                                                                    |
| width          | integer | The width of the original picture                                  |
| height         | integer | The height of the original picture                                 |

## Example ltr/rtl

```javascript
import { createIchefSrcSet } from '#app/utilities/imageSrcSets';

const imageResolutions = [70, 95, 144, 183, 240, 320, 660];

const { srcSet, fallbackSrcSet } = createIchefSrcSet({
  originCode,
  locator,
  originalImageWidth,
  imageResolutions,
});

<Image
  src="this-is-an-image.png"
  altText="This is a random image"
  srcset={srcSet}
  fallbackSrcset={fallbackSrcSet}
  width={originalImageWidth}
  height={originalImageHeight}
/>;
```

## Uninuitive implementation

in index.styles.jsx we style the image using `aspect-ratio: 16 / 9;`, this is to conform all the image to the same size. If this is not applied we can have visual bugs if the component is used in lists where we want the items to be the same size, e.g:
