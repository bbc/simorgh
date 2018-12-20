import React from 'react';
import { string, number, objectOf, any } from 'prop-types';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import Figure from '../../components/Figure';
import Image, { AmpImg } from '../../components/Figure/Image';
import ImagePlaceholder from '../../components/Figure/ImagePlaceholder';
import Copyright from '../Copyright';
import Caption from '../Caption';
import { PlatformContextConsumer } from '../../contexts/PlatformContext';

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = block => (block ? <Caption block={block} /> : null);

const renderImage = (alt, height, platform, src, srcset, width) => {
  if (platform === 'amp') {
    return (
      <AmpImg
        alt={alt}
        height={height}
        src={src}
        srcset={srcset}
        width={width}
      />
    );
  }

  return <Image alt={alt} src={src} srcset={srcset} width={width} />;
};

const FigureContainer = ({
  alt,
  captionBlock,
  copyright,
  height,
  ratio,
  src,
  srcset,
  width,
}) => (
  <PlatformContextConsumer>
    {platform => (
      <Figure>
        <ImagePlaceholder ratio={ratio}>
          {renderImage(alt, height, platform, src, srcset, width)}
          {renderCopyright(copyright)}
        </ImagePlaceholder>
        {renderCaption(captionBlock)}
      </Figure>
    )}
  </PlatformContextConsumer>
);

FigureContainer.propTypes = {
  alt: string.isRequired,
  captionBlock: objectOf(any),
  copyright: string,
  height: number.isRequired,
  ratio: number.isRequired,
  src: string.isRequired,
  srcset: string,
  width: number.isRequired,
};

FigureContainer.defaultProps = {
  captionBlock: null,
  copyright: null,
  srcset: null,
};

export default FigureContainer;
