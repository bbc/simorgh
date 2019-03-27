import React from 'react';
import { string, number, objectOf, any } from 'prop-types';
import Figure from '@bbc/psammead-figure';
import Image, { AmpImg } from '@bbc/psammead-image';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import Copyright from '../Copyright';
import Caption from '../Caption';
import { RequestContextConsumer } from '../../contexts/RequestContext';
import {
  GridItemConstrainedLargeNoMargin,
  GridItemConstrainedMedium,
  GridItemConstrainedSmall,
} from '../../lib/styledGrid';

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
  let Wrapper = GridItemConstrainedLargeNoMargin;

  if (height === width) {
    Wrapper = GridItemConstrainedMedium;
  }
  if (height > width) {
    Wrapper = GridItemConstrainedSmall;
  }

  return (
    <Figure>
      <ImagePlaceholder ratio={ratio}>
        <Wrapper>
          <RequestContextConsumer>
            {({ platform }) =>
              platform === 'amp' ? (
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
              )
            }
          </RequestContextConsumer>
        </Wrapper>
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
