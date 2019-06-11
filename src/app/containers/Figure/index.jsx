import React, { useContext, Fragment } from 'react';
import { string, number, objectOf, any, bool } from 'prop-types';
import Figure from '@bbc/psammead-figure';
import Image, { AmpImg } from '@bbc/psammead-image';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import LazyLoad from 'react-lazyload';
import Copyright from '../Copyright';
import Caption from '../Caption';
import { RequestContext } from '../../contexts/RequestContext';
import {
  NestedGridItemLarge,
  NestedGridItemMedium,
  NestedGridItemSmall,
} from '../../lib/styledGrid';

const LAZYLOAD_OFFSET = 250; // amount of pixels below the viewport to begin loading the image

const renderImage = (imageToRender, lazyLoad) =>
  lazyLoad ? (
    <Fragment>
      <LazyLoad offset={LAZYLOAD_OFFSET} once>
        {imageToRender}
      </LazyLoad>
      <noscript>{imageToRender}</noscript>
    </Fragment>
  ) : (
    imageToRender
  );

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = (block, type) =>
  block ? <Caption block={block} type={type} /> : null;

const FigureContainer = ({
  alt,
  copyright,
  captionBlock,
  lazyLoad,
  ratio,
  src,
  height,
  width,
  type,
  srcset,
}) => {
  const { platform } = useContext(RequestContext);
  const imageToRender = (
    <Image alt={alt} src={src} width={width} srcset={srcset} />
  );

  let Wrapper = NestedGridItemLarge;

  if (height === width) {
    Wrapper = NestedGridItemMedium;
  }
  if (height > width) {
    Wrapper = NestedGridItemSmall;
  }

  return (
    <Wrapper
      gridColumnStart={1}
      gridSpan={{ group3: '10', group4: '10', group5: '10' }}
    >
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
            renderImage(imageToRender, lazyLoad)
          )}
          {renderCopyright(copyright)}
        </ImagePlaceholder>
        <Wrapper
          gridColumnStart={1}
          gridSpan={{ group3: '10', group4: '5', group5: '12' }}
        >
          {renderCaption(captionBlock, type)}
        </Wrapper>
      </Figure>
    </Wrapper>
  );
};

FigureContainer.propTypes = {
  alt: string.isRequired,
  captionBlock: objectOf(any),
  copyright: string,
  height: number,
  lazyLoad: bool,
  ratio: number.isRequired,
  src: string.isRequired,
  type: string,
  srcset: string,
  width: number.isRequired,
};

FigureContainer.defaultProps = {
  copyright: null,
  captionBlock: null,
  height: null,
  lazyLoad: false,
  type: '',
  srcset: null,
};

export default FigureContainer;
