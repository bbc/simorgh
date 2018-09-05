import React from 'react';
import { string } from 'prop-types';
import Figure from '../../components/Figure';
import Image from '../../components/Figure/Image';
import VisuallyHiddenText from '../../components/VisuallyHiddenText';
import Caption from '../../components/Figure/Caption';

const renderCopyright = copyright =>
  copyright ? <VisuallyHiddenText>{copyright}</VisuallyHiddenText> : null;

const renderCaption = captionValue =>
  captionValue ? <Caption>{captionValue}</Caption> : null;

const FigureContainer = ({ src, alt, copyright, caption }) => (
  <Figure>
    <Image alt={alt} src={src} />
    {renderCopyright(copyright)}
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
