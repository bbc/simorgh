import React from 'react';
import { string, number, objectOf, any } from 'prop-types';
import Figure from '../../components/Figure';
import { Img } from '../../components/Figure/Image';
import ImagePlaceholder from '../../components/Figure/ImagePlaceholder';
import Copyright from '../Copyright';
import Caption from '../Caption';

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = block => (block ? <Caption block={block} /> : null);

const FigureContainer = ({ src, alt, ratio, copyright, captionBlock }) => (
  <Figure>
    <ImagePlaceholder ratio={ratio}>
      <Img alt={alt} src={src} />
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
