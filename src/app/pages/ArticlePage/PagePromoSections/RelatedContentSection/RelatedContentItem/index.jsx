import React, { useContext, forwardRef } from 'react';
import path from 'ramda/src/path';
import { createSrcsets } from '#lib/utilities/srcSet';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import Promo from '#components/OptimoPromos';
import isEmpty from 'ramda/src/isEmpty';
import { ServiceContext } from '#contexts/ServiceContext';
import { TitleWithContent, StyledRelatedContentWrapper } from './index.styles';

const RelatedContentItem = forwardRef(
  ({ item, ariaLabelledBy, eventTrackingData = null }, viewRef) => {
    const { script } = useContext(ServiceContext);
    if (!item || isEmpty(item)) return null;

    const headline = path(
      ['model', 'blocks', 1, 'model', 'blocks', 0, 'model', 'text'],
      item,
    );
    const assetUri = path(
      [
        'model',
        'blocks',
        1,
        'model',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'locator',
      ],
      item,
    );

    const DEFAULT_IMAGE_RES = 660;
    const imageResolutions = [70, 95, 144, 183, 240, 320, 660];
    const locator = path(
      ['model', 'blocks', 0, 'model', 'blocks', 1, 'model', 'locator'],
      item,
    );

    const originCode = path(
      ['model', 'blocks', 0, 'model', 'blocks', 1, 'model', 'originCode'],
      item,
    );
    const altText = path(
      [
        'model',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'text',
      ],
      item,
    );

    const width = path(
      ['model', 'blocks', 0, 'model', 'blocks', 1, 'model', 'width'],
      item,
    );

    const height = path(
      ['model', 'blocks', 0, 'model', 'blocks', 1, 'model', 'height'],
      item,
    );

    const { primarySrcset, fallbackSrcset } = createSrcsets({
      originCode,
      locator,
      originalImageWidth: width,
      imageResolutions,
    });

    const src = buildIChefURL({
      originCode,
      locator,
      resolution: DEFAULT_IMAGE_RES,
    });

    const timestamp = path(
      ['model', 'blocks', 2, 'model', 'blocks', 0, 'model', 'timestamp'],
      item,
    );

    const titleTag = timestamp ? 'h3' : 'div';

    const titleHasContent = titleTag === 'h3';

    const Title = titleHasContent ? TitleWithContent : Promo.Title;

    return (
      <StyledRelatedContentWrapper ref={viewRef}>
        <Promo
          to={assetUri}
          ariaLabelledBy={ariaLabelledBy}
          eventTrackingData={eventTrackingData}
        >
          <Promo.Image
            src={src}
            altText={altText}
            srcset={primarySrcset}
            fallbackSrcset={fallbackSrcset}
            width={width}
            height={height}
          />
          <Promo.ContentWrapper>
            <Title as={titleTag} script={script}>
              <Promo.Link>
                <Promo.Content headline={headline} />
              </Promo.Link>
            </Title>
            <Promo.Timestamp>{timestamp}</Promo.Timestamp>
          </Promo.ContentWrapper>
        </Promo>
      </StyledRelatedContentWrapper>
    );
  },
);

export default RelatedContentItem;
