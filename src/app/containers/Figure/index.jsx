import React from 'react';
import { string, number, objectOf, any } from 'prop-types';
import Figure from '@bbc/psammead-figure';
import Image, { AmpImg } from '@bbc/psammead-image';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import Copyright from '../Copyright';
import Caption from '../Caption';
import { PlatformContextConsumer } from '../../contexts/PlatformContext';

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = block => (block ? <Caption block={block} /> : null);

const FigureContainer = ({
  alt,
  copyright,
  captionBlock,
  ratio,
  src,
  height,
  width,
}) => (
  <Figure>
    <ImagePlaceholder ratio={ratio}>
      <PlatformContextConsumer>
        {platform =>
          platform === 'amp' ? (
            <AmpImg
              alt={alt}
              attribution={copyright}
              layout="responsive"
              src={src}
              height={height}
              width={width}
            />
          ) : (
            <Image alt={alt} src={src} width={width} />
          )
        }
      </PlatformContextConsumer>
      {renderCopyright(copyright)}
    </ImagePlaceholder>
    {renderCaption(captionBlock)}
  </Figure>
);

FigureContainer.propTypes = {
  alt: string.isRequired,
  captionBlock: objectOf(any),
  copyright: string,
  ratio: number.isRequired,
  src: string.isRequired,
  height: number,
  width: number.isRequired,
};

FigureContainer.defaultProps = {
  copyright: null,
  captionBlock: null,
  height: null,
};

export default FigureContainer;
