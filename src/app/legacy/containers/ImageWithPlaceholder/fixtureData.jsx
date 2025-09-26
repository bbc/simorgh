import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContext } from '../../../contexts/ServiceContext';
import FigureContainer from '.';
import ThemeProvider from '../../../components/ThemeProvider';

const serviceContextStubNews = {
  imageCaptionOffscreenText: 'Image caption, ',
};

const WrappedImageWithPlaceholder = ({ isAmp, ...otherProps }) => (
  <ThemeProvider service="news">
    <ServiceContext.Provider value={serviceContextStubNews}>
      <RequestContextProvider
        isAmp={isAmp}
        isUK
        origin="https://www.bbc.co.uk"
        id="c0000000000o"
        service="news"
        statusCode={200}
        pathname="/pathname"
        pageType={HOME_PAGE}
      >
        <FigureContainer {...otherProps} />
      </RequestContextProvider>
    </ServiceContext.Provider>
  </ThemeProvider>
);

const baseFixture = {
  alt: 'Pauline Clayton',
  children: null,
  copyright: 'Getty Images',
  fade: true,
  height: 360,
  lazyLoad: false,
  isAmp: false,
  ratio: 56.25,
  src: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg',
  srcset:
    'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg.webp 640w',
  fallbackSrcset:
    'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg 640w',
  primaryMimeType: 'image/webp',
  fallbackMimeType: 'image/jpeg',
  width: 640,
};

const baseFixturePng = {
  alt: 'Nick Triggle',
  children: null,
  copyright: 'Getty Images',
  fade: true,
  height: 360,
  lazyLoad: false,
  isAmp: false,
  ratio: 56.25,
  src: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/14763/production/_112811838__112171791_nicktriggle_tr-nc.png',
  srcset:
    'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/14763/production/_112811838__112171791_nicktriggle_tr-nc.png.webp 640w',
  fallbackSrcset:
    'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/14763/production/_112811838__112171791_nicktriggle_tr-nc.png 640w',
  primaryMimeType: 'image/webp',
  fallbackMimeType: 'image/png',
  width: 640,
};

export const ImageWithPlaceholder = ({ preload = false }) => {
  const props = {
    ...baseFixture,
    preload,
  };
  return <WrappedImageWithPlaceholder {...props} />;
};

export const AmpImageWithPlaceholder = () => {
  const props = {
    ...baseFixture,
    isAmp: true,
  };

  return <WrappedImageWithPlaceholder {...props} />;
};

export const AmpImageWithPlaceholderPng = () => {
  const props = {
    ...baseFixturePng,
    isAmp: true,
  };

  return <WrappedImageWithPlaceholder {...props} />;
};

export const LazyLoadImageWithPlaceholder = ({ fallback, lazyLoad = true }) => {
  const props = {
    ...baseFixture,
    fallback,
    lazyLoad,
  };

  return <WrappedImageWithPlaceholder {...props} />;
};
