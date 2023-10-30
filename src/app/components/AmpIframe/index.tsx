/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { GridItemMedium } from '#components/Grid';
import styles from './index.styles';

type Props = {
  children: JSX.Element[];
  className?: string;
  width: number;
  height: number;
  src: string;
};

type ampMetadata = {
  ampMetadata: {
    imageWidth: number;
    imageHeight: number;
    image: string;
    src: string;
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

const AmpIframe = ({ children, className, width, height, src }: Props) => (
  <amp-iframe
    class={className}
    width={width}
    height={height}
    layout="responsive"
    sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-forms"
    resizable=""
    src={src}
  >
    {children}
  </amp-iframe>
);

const VjAmp = ({
  ampMetadata: { imageWidth, imageHeight, image, src },
}: ampMetadata) => {
  return (
    <>
      <AmpHead />
      <GridItemMedium gridColumnStart={undefined} gridSpan={undefined}>
        <AmpIframe width={imageWidth} height={imageHeight} src={src}>
          {/* @ts-expect-error Property 'overflow' does not exist on type 'DivProps & { css?: Interpolation<Theme>; }'. */}
          <div overflow="" css={styles.overflow}>
            <button type="button" css={styles.button}>
              Show more
            </button>
          </div>
          <amp-img layout="fill" src={image} placeholder />
        </AmpIframe>
      </GridItemMedium>
    </>
  );
};

export default VjAmp;
