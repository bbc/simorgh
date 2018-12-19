import React from 'react';
import { string, number, objectOf, any } from 'prop-types';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import Figure from '../../components/Figure';
import Image from '../../components/Figure/Image';
import Copyright from '../Copyright';
import Caption from '../Caption';

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = block => (block ? <Caption block={block} /> : null);

const FigureContainer = ({ src, alt, ratio, copyright, captionBlock }) => (
  <Figure>
    <ImagePlaceholder ratio={ratio}>
      <Image alt={alt} src={src} />
      {renderCopyright(copyright)}
    </ImagePlaceholder>
    {renderCaption(captionBlock)}
  </Figure>
);

FigureContainer.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  ratio: number.isRequired,
  copyright: string,
  captionBlock: objectOf(any),
};

FigureContainer.defaultProps = {
  copyright: null,
  captionBlock: null,
};

export default FigureContainer;
