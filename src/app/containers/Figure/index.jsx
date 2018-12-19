import React from 'react';
import { string, number, objectOf, any } from 'prop-types';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import Image from '@bbc/psammead-image';
import Figure from '../../components/Figure';
import Copyright from '../Copyright';
import Caption from '../Caption';

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = block => (block ? <Caption block={block} /> : null);

const FigureContainer = ({
  alt,
  copyright,
  captionBlock,
  height,
  ratio,
  src,
  width,
}) => (
  <Figure>
    <ImagePlaceholder ratio={ratio}>
      <Image alt={alt} src={src} width={width} />
      {renderCopyright(copyright)}
    </ImagePlaceholder>
    {renderCaption(captionBlock)}
  </Figure>
);

FigureContainer.propTypes = {
  alt: string.isRequired,
  captionBlock: objectOf(any),
  copyright: string,
  height: number.isRequired,
  ratio: number.isRequired,
  src: string.isRequired,
  width: number.isRequired,
};

FigureContainer.defaultProps = {
  copyright: null,
  captionBlock: null,
};

export default FigureContainer;
