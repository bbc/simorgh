import React from 'react';
import { string, number, objectOf, any } from 'prop-types';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import Figure from '../../components/Figure';
import Image, { AmpImg } from '../../components/Figure/Image';
import Copyright from '../Copyright';
import Caption from '../Caption';
import { PlatformContextConsumer } from '../../contexts/PlatformContext';

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = block => (block ? <Caption block={block} /> : null);

const renderImage = (
  alt,
  copyright,
  height,
  platform,
  ratio,
  src,
  srcset,
  width,
) => {
  if (platform === 'amp') {
    return (
      <AmpImg
        attribution={copyright}
        alt={alt}
        src={src}
        srcset={srcset}
        layout="responsive"
        height={height}
        width={width}
      />
    );
  }

  return (
    <ImagePlaceholder ratio={ratio}>
      <Image alt={alt} src={src} srcset={srcset} width={width} />
      {renderCopyright(copyright)}
    </ImagePlaceholder>
  );
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
        {renderImage(
          alt,
          copyright,
          height,
          platform,
          ratio,
          src,
          srcset,
          width,
        )}
        {renderCaption(captionBlock)}
      </Figure>
    )}
  </PlatformContextConsumer>
);

FigureContainer.propTypes = {
  alt: string.isRequired,
  captionBlock: objectOf(any),
  copyright: string,
  src: string.isRequired,
  srcset: string,
  height: number.isRequired,
  width: number.isRequired,
  ratio: number.isRequired,
};

FigureContainer.defaultProps = {
  captionBlock: null,
  copyright: null,
  srcset: null,
};

export default FigureContainer;
