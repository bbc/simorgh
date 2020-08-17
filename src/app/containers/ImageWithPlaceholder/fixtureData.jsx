import React from 'react';
import {
  bool,
  string,
  number,
  shape,
  arrayOf,
  oneOfType,
  object,
} from 'prop-types';
import FigureContainer from '.';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';

const serviceContextStubNews = {
  imageCaptionOffscreenText: 'Image caption, ',
};

const WrappedImageWithPlaceholder = ({ isAmp, ...otherProps }) => (
  <ServiceContext.Provider value={serviceContextStubNews}>
    <RequestContextProvider
      isAmp={isAmp}
      isUK
      origin="https://www.bbc.co.uk"
      id="c0000000000o"
      service="news"
      statusCode={200}
      pathname="/pathname"
      pageType="frontPage"
    >
      <FigureContainer {...otherProps} />
    </RequestContextProvider>
  </ServiceContext.Provider>
);

WrappedImageWithPlaceholder.propTypes = {
  caption: shape({
    model: shape({
      blocks: arrayOf(oneOfType([string, object])),
    }),
  }),
  copyright: string,
  lazyLoad: bool,
  isAmp: bool,
  type: string,
  height: number,
  width: number,
};

WrappedImageWithPlaceholder.defaultProps = {
  caption: null,
  copyright: null,
  lazyLoad: false,
  isAmp: false,
  type: '',
  height: null,
  width: null,
};

const baseFixture = {
  alt: 'Pauline Clayton',
  children: null,
  copyright: 'Getty Images',
  fade: true,
  height: 360,
  lazyLoad: false,
  isAmp: false,
  ratio: 56.25,
  src:
    'https://ichef.bbci.co.uk/news/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg',
  srcset:
    'https://ichef.bbci.co.uk/news/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg 640w',
  width: 640,
};

export const ImageWithPlaceholder = () => {
  const props = baseFixture;
  return <WrappedImageWithPlaceholder {...props} />;
};

export const AmpImageWithPlaceholder = () => {
  const props = {
    ...baseFixture,
    isAmp: true,
  };

  return <WrappedImageWithPlaceholder {...props} />;
};

// eslint-disable-next-line react/prop-types
export const LazyLoadImageWithPlaceholder = ({ fallback }) => {
  const props = {
    ...baseFixture,
    fallback,
    lazyLoad: true,
  };

  return <WrappedImageWithPlaceholder {...props} />;
};
