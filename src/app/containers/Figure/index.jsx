import React from 'react';
import { string, number } from 'prop-types';
import LazyLoad from 'react-lazyload';
import Figure from '../../components/Figure';
import Image from '../../components/Figure/Image';
import VisuallyHiddenText from '../../components/VisuallyHiddenText';
import Caption from '../../components/Figure/Caption';
import Text from '../../components/Text';

const renderCopyright = copyright =>
  copyright ? <VisuallyHiddenText>{copyright}</VisuallyHiddenText> : null;

const renderCaption = captionValue =>
  captionValue ? (
    <Text text={captionValue} paragraphOverride={Caption} />
  ) : null;

const getPlaceholder = reservedImageHeight => (
  <Image
    alt="blah blah blah"
    src="https://www.wpfreeware.com/wp-content/uploads/2014/09/placeholder-images.jpg"
    height={reservedImageHeight}
  />
);

const FigureContainer = ({
  src,
  alt,
  reservedImageHeight,
  copyright,
  caption,
}) => (
  <Figure>
    <LazyLoad
      height={reservedImageHeight}
      offset={100}
      placeholder={getPlaceholder(reservedImageHeight)}
      once
    >
      <Image alt={alt} src={src} />
      {renderCopyright(copyright)}
      {renderCaption(caption)}
    </LazyLoad>
  </Figure>
);

FigureContainer.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  reservedImageHeight: number.isRequired,
  copyright: string,
  caption: string,
};

FigureContainer.defaultProps = {
  copyright: null,
  caption: null,
};

export default FigureContainer;
