import React, { useContext } from 'react';
import { string, number, objectOf, any } from 'prop-types';
import Figure from '@bbc/psammead-figure';
import Image, { AmpImg } from '@bbc/psammead-image';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import LazyLoad from 'react-lazyload';
import Copyright from '../Copyright';
import Caption from '../Caption';
import { RequestContext } from '../../contexts/RequestContext';

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = (block, type) =>
  block ? <Caption block={block} type={type} /> : null;

const FigureContainer = ({
  alt,
  copyright,
  captionBlock,
  ratio,
  src,
  height,
  width,
  type,
}) => {
  const { platform } = useContext(RequestContext);
  return (
    <Figure>
      <ImagePlaceholder ratio={ratio}>
        {platform === 'amp' ? (
          <AmpImg
            alt={alt}
            attribution={copyright || ''}
            layout="responsive"
            src={src}
            height={height}
            width={width}
          />
        ) : (
          <LazyLoad offset={250} once>
            <Image alt={alt} src={src} width={width} />
          </LazyLoad>
        )}
        {renderCopyright(copyright)}
      </ImagePlaceholder>
      {renderCaption(captionBlock, type)}
    </Figure>
  );
};

FigureContainer.propTypes = {
  alt: string.isRequired,
  captionBlock: objectOf(any),
  copyright: string,
  ratio: number.isRequired,
  src: string.isRequired,
  height: number,
  width: number.isRequired,
  type: string,
};

FigureContainer.defaultProps = {
  copyright: null,
  captionBlock: null,
  height: null,
  type: '',
};

export default FigureContainer;
