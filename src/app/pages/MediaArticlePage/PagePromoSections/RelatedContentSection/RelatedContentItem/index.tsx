/** @jsxRuntime classic */
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
import { EventTrackingData } from '../../../types';

type RelatedContentItemProps = {
  item: object;
  ariaLabelledBy: string;
  eventTrackingData?: EventTrackingData;
};

const RelatedContentItem = forwardRef<HTMLDivElement, RelatedContentItemProps>(
  ({ item, ariaLabelledBy, eventTrackingData = null }, viewRef) => {
    if (!item || isEmpty(item)) return null;

    const headline = pathOr<string>(
      '',
      ['model', 'blocks', 1, 'model', 'blocks', 0, 'model', 'text'],
      item,
    );
    const assetUri = path<string>(
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
      0,
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
      <div css={styles.wrapper} ref={viewRef}>
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
