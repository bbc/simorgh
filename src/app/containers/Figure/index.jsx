import React, { useContext, Fragment, useState } from 'react';
import { string, number, objectOf, any, bool } from 'prop-types';
import Figure from '@bbc/psammead-figure';
import Image, { AmpImg } from '@bbc/psammead-image';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import LazyLoad from 'react-lazyload';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import Copyright from '../Copyright';
import Caption from '../Caption';
import { RequestContext } from '../../contexts/RequestContext';

const LAZYLOAD_OFFSET = 250; // amount of pixels below the viewport to begin loading the image
const FADE_IN_DURATION = 200; // number of miillisecconds to  apply the fade-in effect

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const ImageWrapper = styled.div`
  transition: ${() => `opacity ${FADE_IN_DURATION}ms ease-in-out`};
  opacity: ${props => props.opacity || 0};
`;

const renderImage = (imageToRender, lazyLoad, fadeIn, setFadeIn) =>
  lazyLoad ? (
    <Fragment>
      <LazyLoad offset={LAZYLOAD_OFFSET} once scroll>
        <Transition in={fadeIn} timeout={FADE_IN_DURATION}>
          {state => (
            <ImageWrapper
              {...transitionStyles[state]}
              onLoad={() => setFadeIn(true)}
            >
              {imageToRender}
            </ImageWrapper>
          )}
        </Transition>
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

  const [fadeIn, setFadeIn] = useState(false);

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
          renderImage(imageToRender, lazyLoad, fadeIn, setFadeIn)
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
