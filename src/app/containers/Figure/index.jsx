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
  GridItemCaptionLandscapeSquare,
  GridItemCaptionPortrait,
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
  let CaptionWrapper = GridItemCaptionLandscapeSquare;

  if (height === width) {
    Wrapper = GridItemConstrainedMedium;
  }
  if (height > width) {
    Wrapper = GridItemConstrainedSmall;
    CaptionWrapper = GridItemCaptionPortrait;
  }

  Wrapper = GridItemConstrainedSmall;

  return (
    <Figure>
      <Wrapper>
        <ImagePlaceholder ratio={ratio}>
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
          {renderCopyright(copyright)}
        </ImagePlaceholder>
      </Wrapper>
      <CaptionWrapper>{renderCaption(captionBlock)}</CaptionWrapper>
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
