import React, { useContext } from 'react';
import { shape, string, number } from 'prop-types';
import path from 'ramda/src/path';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { buildUniquePromoId } from '#app/containers/StoryPromo/utilities';
import { createSrcsets } from '#lib/utilities/srcSet';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import Promo from '#containers/NewStoryPromo';

const RelatedContentItem = ({ item, labelId, index }) => {
  const { script } = useContext(ServiceContext);
  const linkId = buildUniquePromoId({
    sectionType: 'top-stories',
    promoGroupId: labelId,
    promoItem: item,
    promoIndex: index,
  });
  const headline = path(
    ['model', 'blocks', 1, 'model', 'blocks', 0, 'model', 'text'],
    item,
  );
  const url = path(
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

  const RATIO = 56.25;
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

  return (
    <Promo to={url} id={linkId}>
      <Promo.ImagePlaceholder
        src={src}
        alt={altText}
        srcset={primarySrcset}
        fallbackSrcset={fallbackSrcset}
        ratio={RATIO}
        width={width}
        height={height}
        lazyload
      />
      <Promo.ContentWrapper>
        <Promo.Heading script={script}>
          <Promo.Link>
            <Promo.Content headline={headline} />
          </Promo.Link>
        </Promo.Heading>
        <Promo.Timestamp>{timestamp}</Promo.Timestamp>
      </Promo.ContentWrapper>
    </Promo>
  );
};

RelatedContentItem.propTypes = {
  item: shape({}).isRequired,
  labelId: string.isRequired,
  index: number.isRequired,
};

export default RelatedContentItem;
