import React from 'react';
import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';
import { GridItemMedium } from '#components/Grid';

type Props = {
  className?: string;
  width: number;
  height: number;
  src: string;
  title?: string;
};

type ampMetadata = {
  ampMetadata: {
    imageWidth: number;
    imageHeight: number;
    image: string;
    src: string;
    title?: string;
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
}: PropsWithChildren<Props>) => (
  <amp-iframe
    class={className}
    width={width}
    height={height}
    layout="responsive"
    sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-forms"
    resizable=""
    src={src}
    title={title}
  >
    {children}
  </amp-iframe>
);

const AmpIframe = ({
  ampMetadata: { imageWidth, imageHeight, image, src, title },
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
        >
          {/* @ts-expect-error Property 'overflow' does not exist on type 'DivProps & { css?: Interpolation<Theme>; }'. */}
          <div 
            overflow="" 
            className="bg-gradient-to-t from-white via-white to-transparent flex justify-center after:content-[''] after:block after:h-2/4 after:left-0 after:absolute after:top-0 after:w-full after:z-[-10] after:bg-white after:border-t-2 after:border-ebon"
          >
            <button 
              type="button" 
              className="font-sans-bold text-pica bg-ebon border border-transparent text-white cursor-pointer block p-full_double hover:underline focus:underline"
            >
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
