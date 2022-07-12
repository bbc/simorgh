import React, { useContext } from 'react';
import { shape, number } from 'prop-types';
import path from 'ramda/src/path';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { createSrcsets } from '#lib/utilities/srcSet';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import Promo from '#containers/NewStoryPromo';
import isEmpty from 'ramda/src/isEmpty';
import optimoPromoIdGenerator from '../utility';

const RelatedContentItem = ({ item, index }) => {
  const { script } = useContext(ServiceContext);
  if (!item || isEmpty(item)) return null;

  const eventTrackingData = {
    block: {
      componentName: 'related-content',
    },
  };

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

  const linkId = optimoPromoIdGenerator(
    'promo-rel-content',
    assetUri,
    '',
    '',
    index,
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

  const headingTagOverride = timestamp ? '' : 'div';

  return (
    <Promo
      toLink={assetUri}
      a11yId={linkId}
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
        <Promo.Heading headingTagOverride={headingTagOverride} script={script}>
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
  index: number.isRequired,
};

export default RelatedContentItem;
