import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';
import { GridItemMedium } from '#components/Grid';
import styles from './index.styles';

type Props = {
  className?: string;
  height: number;
  src: string;
  width?: number;
  title?: string;
  layout?: 'responsive' | 'fixed-height';
};

type ampMetadata = {
  ampMetadata: {
    imageWidth?: number;
    imageHeight: number;
    image: string;
    src: string;
    title?: string;
    layout?: 'responsive' | 'fixed-height';
  };
};

const AmpHead = () => (
  <Helmet>
    <script
      async
      custom-element="amp-iframe"
      src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
    />
  </Helmet>
);

const AmpIframeElement = ({
  children,
  className,
  width,
  height,
  src,
  title,
  layout,
}: PropsWithChildren<Props>) => (
  <amp-iframe
    class={className}
    width={width}
    height={height}
    layout={layout}
    sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-forms"
    resizable=""
    src={src}
    title={title}
  >
    {children}
  </amp-iframe>
);

const AmpIframe = ({
  ampMetadata: {
    imageWidth,
    imageHeight,
    image,
    src,
    title,
    layout = 'responsive',
  },
}: ampMetadata) => {
  return (
    <>
      <AmpHead />
      <GridItemMedium gridColumnStart={undefined} gridSpan={undefined}>
        <AmpIframeElement
          width={imageWidth}
          height={imageHeight}
          src={src}
          title={title}
          layout={layout}
        >
          {/* @ts-expect-error Property 'overflow' does not exist on type 'DivProps & { css?: Interpolation<Theme>; }'. */}
          <div overflow="" css={styles.overflow}>
            <button type="button" css={styles.button}>
              Show more
            </button>
          </div>
          <amp-img layout="fill" src={image} placeholder="true" />
        </AmpIframeElement>
      </GridItemMedium>
    </>
  );
};

export default AmpIframe;
