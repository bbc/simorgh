import React from 'react';
import { string } from 'prop-types';
import Figure from '../../components/Figure';
import Image from '../../components/Figure/Image';
import Caption from '../../components/Figure/Caption';
import ImageWrapper from '../../components/Figure/ImageWrapper';
import Copyright from '../../components/Figure/Copyright';

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = captionValue =>
  captionValue ? <Caption>{captionValue}</Caption> : null;

const FigureContainer = ({ src, alt, copyright, caption }) => (
  <Figure>
    <ImageWrapper>
      <Image alt={alt} src={src} />
      {renderCopyright(copyright)}
    </ImageWrapper>
    {renderCaption(caption)}
  </Figure>
);

FigureContainer.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  copyright: string,
  caption: string,
};

FigureContainer.defaultProps = {
  copyright: null,
  caption: null,
};

export default FigureContainer;
