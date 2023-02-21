# Promo Image

## Description

A component that is implemented using psammead-image and imageWithPlaceholder. However, this component takes it a step further by styling the psammead-image in order to fix a bug with aspect-ratio.

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
import buildIChefURL from '#app/lib/utilities/ichefURL';

const imageResolutions = [70, 95, 144, 183, 240, 320, 660];

const { srcset, fallbackSrcset } = createSrcsets({
  originCode,
  locator,
  originalImageWidth: originalImageWidth,
  imageResolutions,
});

<Image
  src="this-is-an-image.png"
  altText="This is a random image"
  srcset={srcset}
  fallbackSrcset={fallbackSrcset}
  width={originalImageWidth}
  height={originalImageHeight}
/>;
```

## Uninuitive implementation

in index.styles.jsx we style the image using `aspect-ratio: 16 / 9;`, this is to conform all the image to the same size. If this is not applied we can have visual bugs if the component is used in lists where we want the items to be the same size, e.g:
