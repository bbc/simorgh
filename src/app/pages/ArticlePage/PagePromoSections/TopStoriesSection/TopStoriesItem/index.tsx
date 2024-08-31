/** @jsx jsx */

import { jsx } from '@emotion/react';
import { forwardRef } from 'react';
import { getIsLive } from '#lib/utilities/getStoryPromoInfo';
import Promo from '#components/OptimoPromos';
import { EventTrackingBlock } from '#app/models/types/eventTracking';

import styles from './index.styles';
import { TopStoryItem } from '../types';

const getArticleTopStoryItem = (item: TopStoryItem) => {
  const overtypedHeadline = item?.headlines?.overtyped ?? '';
  const mainHeadline = item?.headlines?.headline ?? '';
  const headlineBlockText =
    // @ts-expect-error - nested block structure
    item?.headlines?.promoHeadline?.blocks?.[0]?.model?.blocks?.[0]?.model
      ?.text ?? '';

  const name = item?.name ?? '';

  const headline =
    overtypedHeadline || mainHeadline || headlineBlockText || name;

  const mediaType = item?.media?.format ?? '';
  const mediaDuration = item?.media?.duration ?? '';
  const isPhotoGallery = item?.cpsType === 'PGL' ?? null;
  const timestamp = item?.timestamp ?? null;

  const assetUri = item?.locators?.assetUri ?? '';
  const canonicalUrl = item?.locators?.canonicalUrl ?? '';
  const uri = item?.uri ?? '';

  const isLive = getIsLive(item);

  return {
    assetUri,
    canonicalUrl,
    headline,
    isLive,
    isPhotoGallery,
    mediaType,
    mediaDuration,
    timestamp,
    uri,
  };
};

const getLiveTopStoryItem = (item: TopStoryItem) => {
  const headline = item?.headline || '';
  const uri = item?.destinationUrl || '';
  const isLive = item?.isLive || false;

  return {
    headline,
    isLive,
    uri,
    assetUri: undefined,
    canonicalUrl: undefined,
    mediaType: undefined,
    mediaDuration: undefined,
    timestamp: undefined,
    isPhotoGallery: false,
  };
};

type TopStoriesItemProps = {
  item: TopStoryItem;
  ariaLabelledBy: string;
  eventTrackingData?: EventTrackingBlock | null;
};

const TopStoriesItem = forwardRef(
  (
    { item, ariaLabelledBy, eventTrackingData = null }: TopStoriesItemProps,
    viewRef,
  ) => {
    if (!item || Object.keys(item).length === 0) return null;

    const itemExtractor = {
      optimo: getArticleTopStoryItem,
      cps: getArticleTopStoryItem,
      link: getArticleTopStoryItem,
      'tipo-live': getLiveTopStoryItem,
    }[item?.type];

    if (!itemExtractor) return null;

    const {
      assetUri,
      canonicalUrl,
      headline,
      isLive,
      isPhotoGallery,
      mediaType,
      mediaDuration,
      timestamp,
      uri,
    } = itemExtractor(item);

    const titleTag = timestamp || isLive ? 'h3' : 'div';
    const titleHasContent = titleTag === 'h3';

    return (
      <div css={styles.topStoriesWrapper} ref={viewRef}>
        <Promo
          to={assetUri || uri || canonicalUrl}
          ariaLabelledBy={ariaLabelledBy}
          mediaType={mediaType}
          eventTrackingData={eventTrackingData}
        >
          <Promo.ContentWrapper>
            <Promo.Title
              css={titleHasContent ? styles.titleWithContent : styles.title}
              as={titleTag}
            >
              <Promo.Link>
                {mediaType && <Promo.MediaIndicator />}
                {isLive ? (
                  <Promo.LiveLabel id={ariaLabelledBy}>
                    <Promo.Content
                      mediaDuration={mediaDuration}
                      headline={headline}
                      isPhotoGallery={isPhotoGallery}
                      isLive={isLive}
                    />
                  </Promo.LiveLabel>
                ) : (
                  <Promo.Content
                    mediaDuration={mediaDuration}
                    headline={headline}
                    isPhotoGallery={isPhotoGallery}
                  />
                )}
              </Promo.Link>
            </Promo.Title>
            {timestamp && (
              <Promo.Timestamp css={styles.timestamp}>
                {timestamp}
              </Promo.Timestamp>
            )}
          </Promo.ContentWrapper>
        </Promo>
      </div>
    );
  },
);

export default TopStoriesItem;
