# Image component

## Usage

Importing the standard Image component, which renders an `<img />` tag.

```jsx
import Image from '../components/Image';

const WrappingContainer = ({ alt, height, src, width }) => (
  <Img alt={alt} src={src} height={height} width={width} />
);
```

Importing an Amp Image component, which renders an `<amp-img />` tag.

```jsx
import AmpImg from '../components/Image/image.amp';

const WrappingContainer = ({ alt, height, src, width }) => (
  <AmpImg alt={alt} src={src} height={height} width={width} />
);
```
