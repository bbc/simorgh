import React, { useContext, Fragment } from 'react';
import { string, number, objectOf, any, bool } from 'prop-types';
import Figure from '@bbc/psammead-figure';
import Image, { AmpImg } from '@bbc/psammead-image';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import LazyLoad from 'react-lazyload';
import Copyright from '../Copyright';
import Caption from '../Caption';
import { RequestContext } from '../../contexts/RequestContext';

const renderImage = (alt, lazyload, src, width) =>
  lazyload ? (
    <Fragment>
      <LazyLoad offset={250} once>
        <Image alt={alt} src={src} width={width} />
      </LazyLoad>
      <noscript>
        <Image alt={alt} src={src} />
      </noscript>
    </Fragment>
  ) : (
    <Image alt={alt} src={src} />
  );

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = (block, type) =>
  block ? <Caption block={block} type={type} /> : null;

const FigureContainer = ({
  alt,
  copyright,
  captionBlock,
  lazyload,
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
          renderImage(alt, lazyload, src, width)
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
  height: number,
  lazyload: bool,
  ratio: number.isRequired,
  src: string.isRequired,
  type: string,
  width: number.isRequired,
};

FigureContainer.defaultProps = {
  copyright: null,
  captionBlock: null,
  height: null,
  lazyload: false,
  type: '',
};

export default FigureContainer;
