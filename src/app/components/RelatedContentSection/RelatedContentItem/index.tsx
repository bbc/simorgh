/** @jsx jsx */

import { jsx } from '@emotion/react';
import { forwardRef } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { createSrcsets } from '#lib/utilities/srcSet';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import Promo from '#components/OptimoPromos';
import isEmpty from 'ramda/src/isEmpty';
import styles from './index.styles';
import { EventTrackingBlock } from '../../../models/types/eventTracking';

type RelatedContentItemProps = {
  item: object;
  ariaLabelledBy: string;
  eventTrackingData?: EventTrackingBlock;
};

const RelatedContentItem = forwardRef<HTMLElement, RelatedContentItemProps>(
  ({ item, ariaLabelledBy, eventTrackingData = null }, viewRef) => {
    if (!item || isEmpty(item)) return null;

    const headlineFirst = pathOr<string>(
      '',
      ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
      item,
    );
    const headlineSecond = pathOr<string>(
      '',
      ['model', 'blocks', 1, 'model', 'blocks', 0, 'model', 'text'],
      item,
    );

    const headline = headlineFirst || headlineSecond;

    const assetUriFirst = pathOr<string>(
      '',
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
        'locator',
      ],
      item,
    );

    const assetUriSecond = pathOr<string>(
      '',
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

    const assetUri = assetUriFirst || assetUriSecond;

    const DEFAULT_IMAGE_RES = 660;
    const imageResolutions = [70, 95, 144, 183, 240, 320, 660];
    const locatorDefault = path(
      ['model', 'blocks', 0, 'model', 'blocks', 1, 'model', 'locator'],
      item,
    );

    const locatorWithCaption = path(
      ['model', 'blocks', 0, 'model', 'blocks', 2, 'model', 'locator'],
      item,
    );

    const locator = locatorDefault || locatorWithCaption;

    const originCodeDefault = path(
      ['model', 'blocks', 0, 'model', 'blocks', 1, 'model', 'originCode'],
      item,
    );

    const originCodeWithCaption = path(
      ['model', 'blocks', 0, 'model', 'blocks', 2, 'model', 'originCode'],
      item,
    );

    const originCode = originCodeDefault || originCodeWithCaption;

    const altText = pathOr<string>(
      '',
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

    const width = pathOr<number>(
      240,
      ['model', 'blocks', 0, 'model', 'blocks', 1, 'model', 'width'],
      item,
    );

    const height = pathOr<number>(
      0,
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

    const timestamp = pathOr<string>(
      '',
      ['model', 'blocks', 2, 'model', 'blocks', 0, 'model', 'timestamp'],
      item,
    );

    const titleTag = timestamp ? 'h3' : 'div';

    const titleHasContent = titleTag === 'h3';

    return (
      <div
        css={[styles.wrapper, headlineFirst && styles.promoFullWidth]}
        {...viewRef}
      >
        <Promo
          to={assetUri}
          ariaLabelledBy={ariaLabelledBy}
          eventTrackingData={eventTrackingData}
        >
          {locator ? (
            <Promo.Image
              src={src}
              altText={altText}
              srcset={primarySrcset}
              fallbackSrcset={fallbackSrcset}
              width={width}
              height={height}
            />
          ) : null}
          <Promo.ContentWrapper>
            <Promo.Title
              css={titleHasContent ? styles.promoTitle : null}
              as={titleTag}
            >
              <Promo.Link>
                <Promo.Content headline={headline} />
              </Promo.Link>
            </Promo.Title>
            <Promo.Timestamp css={styles.promoTimestamp}>
              {timestamp}
            </Promo.Timestamp>
          </Promo.ContentWrapper>
        </Promo>
      </div>
    );
  },
);

export default RelatedContentItem;
