import React, { useContext, Fragment } from 'react';
import { string, number, objectOf, any, bool, oneOf } from 'prop-types';
import Figure from '@bbc/psammead-figure';
import Image, { AmpImg } from '@bbc/psammead-image';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import LazyLoad from 'react-lazyload';
import Copyright from '../Copyright';
import Caption from '../Caption';
import { RequestContext } from '../../contexts/RequestContext';
import FeatureFlag from '../FeatureFlag';

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

const ImageComponent = ({
  platform,
  height,
  width,
  src,
  alt,
  copyright,
  ratio,
  lazyLoad,
  captionBlock,
  type,
  srcset,
  showCopyright,
}) => {
  const imageToRender = (
    <Image alt={alt} src={src} width={width} srcset={srcset} />
  );

  return (
    <Fragment>
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
        {showCopyright && renderCopyright(copyright)}
      </ImagePlaceholder>
      {renderCaption(captionBlock, type)}
    </Fragment>
  );
};

const figurePropTypes = {
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
  showCopyright: bool,
};

const defaultProps = {
  copyright: null,
  captionBlock: null,
  height: null,
  lazyLoad: false,
  type: '',
  srcset: null,
  showCopyright: false,
};

ImageComponent.propTypes = {
  ...figurePropTypes,
  platform: oneOf(['amp', 'canonical']).isRequired,
};

ImageComponent.defaultProps = { ...defaultProps };

const FigureContainer = props => {
  const { platform } = useContext(RequestContext);
  const { useFigure } = props;

  const Wrapper = useFigure ? Figure : Fragment;

  return (
    <Wrapper>
      <ImageComponent {...props} platform={platform} />
    </Wrapper>
  );
};

FigureContainer.propTypes = {
  ...figurePropTypes,
  useFigure: bool,
};

FigureContainer.defaultProps = {
  ...defaultProps,
  useFigure: true,
};

export default FigureContainer;
