import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import Image from '.';
import md from './README.md';

type ImgWithAmpProps = {
  alt: string;
  src: string;
  srcSet?: string;
  mediaType?: string;
  fallbackSrcSet?: string;
  fallbackMediaType?: string;
};

const ImgWithAmp = ({
  alt,
  src,
  srcSet,
  mediaType,
  fallbackSrcSet,
  fallbackMediaType,
}: ImgWithAmpProps) => (
  <RequestContextProvider
    isAmp
    pageType="article"
    pathname="/afaanoromoo"
    service="afaanoromoo"
  >
    <Image
      alt={alt}
      src={src}
      srcSet={srcSet}
      mediaType={mediaType}
      fallbackSrcSet={fallbackSrcSet}
      fallbackMediaType={fallbackMediaType}
    />
  </RequestContextProvider>
);

const BasicImage = () => (
  <Image
    alt="A penguin stands on an ice floe"
    src="https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
  />
);

export default {
  title: 'Components/Image',
  Component: BasicImage,
  parameters: {
    chromatic: { disable: true },
    docs: {
      readme: md,
    },
  },
};

export const ResponsiveImage = () => (
  <Image
    alt="A penguin stands on an ice floe"
    src="https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
    srcSet="https://ichef.bbci.co.uk/ace/ws/240/cpsprodpb/164AF/production/_110911319_antartica.jpg 240w, https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg 624w"
  />
);

export const ResponsiveWebPWithJpegFallback = () => (
  <Image
    alt="A penguin stands on an ice floe"
    src="https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
    srcSet="https://ichef.bbci.co.uk/ace/ws/240/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp 240w, https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp 624w"
    mediaType="image/webp"
    fallbackSrcSet="https://ichef.bbci.co.uk/ace/ws/240/cpsprodpb/164AF/production/_110911319_antartica.jpg 240w, https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg 624w"
    fallbackMediaType="image/jpeg"
  />
);

export const BasicAMPImage = () => (
  <ImgWithAmp
    alt="A penguin stands on an ice floe"
    src="https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
  />
);

export const ResponsiveAMPImage = () => (
  <ImgWithAmp
    alt="A penguin stands on an ice floe"
    src="https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
    srcSet="https://ichef.bbci.co.uk/ace/ws/240/cpsprodpb/164AF/production/_110911319_antartica.jpg 240w, https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg 624w"
  />
);

export const AMPWebPWithJpegFallback = () => (
  <ImgWithAmp
    alt="A penguin stands on an ice floe"
    src="https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
    srcSet="https://ichef.bbci.co.uk/ace/ws/240/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp 240w, https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp 624w"
    mediaType="image/webp"
    fallbackSrcSet="https://ichef.bbci.co.uk/ace/ws/240/cpsprodpb/164AF/production/_110911319_antartica.jpg 240w, https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg 624w"
    fallbackMediaType="image/jpeg"
  />
);

BasicAMPImage.decorators = [AmpDecorator];
ResponsiveAMPImage.decorators = [AmpDecorator];
AMPWebPWithJpegFallback.decorators = [AmpDecorator];
