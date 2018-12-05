import React from 'react';
import { string, number, node } from 'prop-types';
import Figure from '../../components/Figure';
import Image from '../../components/Figure/Image';
import ImagePlaceholder from '../../components/Figure/ImagePlaceholder';
import Copyright from '../Copyright';
import Caption from '../Caption';

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = captionValue =>
  captionValue ? <Caption captionValue={captionValue} /> : null;

const FigureContainer = ({ src, alt, ratio, copyright, caption }) => (
  <Figure>
    <ImagePlaceholder ratio={ratio}>
      <Image alt={alt} src={src} />
      {renderCopyright(copyright)}
    </ImagePlaceholder>
    {renderCaption(caption)}
  </Figure>
);

FigureContainer.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  ratio: number.isRequired,
  copyright: string,
  caption: node,
};

FigureContainer.defaultProps = {
  copyright: null,
  caption: null,
};

export default FigureContainer;
