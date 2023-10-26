/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { GridItemMedium } from '#components/Grid';
import styles from './index.styles';

// removed service

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  className?: string;
  width: string;
  height: string;
  src: string;
};

type ampMetadata = {
  ampMetadata: {
    imageWidth: string;
    imageHeight: string;
    image: string;
    // not sure why optional
    src?: string;
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
  // @ts-expect-error Property 'amp-iframe' does not exist on type 'JSX.IntrinsicElements'
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
    {/* @ts-expect-error Property 'amp-iframe' does not exist on type 'JSX.IntrinsicElements' */}
  </amp-iframe>
);

const VjAmp = ({
  ampMetadata: { imageWidth, imageHeight, image, src },
}: ampMetadata) => {
  return (
    <>
      <AmpHead />
      <GridItemMedium gridColumnStart={undefined} gridSpan={undefined}>
        <AmpIframe
          width={imageWidth}
          height={imageHeight}
          src={src}
          css={styles.ampIframe}
        >
          <div data-overflow="">
            <button type="button" css={styles.button}>
              Show more
            </button>
          </div>
          <amp-img layout="fill" src={image} data-placeholder />
        </AmpIframe>
      </GridItemMedium>
    </>
  );
};

export default VjAmp;
