import React, { useContext } from 'react';
import { string, number, objectOf, any } from 'prop-types';
import Figure from '@bbc/psammead-figure';
import Image, { AmpImg } from '@bbc/psammead-image';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import Copyright from '../Copyright';
import Caption from '../Caption';
import { RequestContext } from '../../contexts/RequestContext';

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
          <Image alt={alt} src={src} width={width} />
        )}
        {renderCopyright(copyright)}
      </ImagePlaceholder>
      {renderCaption(captionBlock)}
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
};

FigureContainer.defaultProps = {
  copyright: null,
  captionBlock: null,
  height: null,
};

export default FigureContainer;
