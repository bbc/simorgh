/** @jsx jsx */

import { jsx } from '@emotion/react';
import { forwardRef } from 'react';
import pathOr from 'ramda/src/pathOr';
import isEmpty from 'ramda/src/isEmpty';
import { getIsLive } from '#lib/utilities/getStoryPromoInfo';
import Promo from '#components/OptimoPromos';
import { EventTrackingBlock } from '#app/models/types/eventTracking';

import styles from './index.styles';
import { Item } from '../types';

const getArticleTopStoryItem = (item: Item) => {
  const overtypedHeadline = pathOr('', ['headlines', 'overtyped'], item);
  const headline =
    overtypedHeadline ||
    pathOr('', ['headlines', 'headline'], item) ||
    pathOr(
      '',
      [
        'headlines',
        'promoHeadline',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'text',
      ],
      item,
    ) ||
    pathOr('', ['name'], item);

  const mediaType = pathOr<string>('', ['media', 'format'], item);
  const mediaDuration = pathOr<string>('', ['media', 'duration'], item);
  const isPhotoGallery = pathOr(null, ['cpsType'], item) === 'PGL';

  const timestamp = pathOr(null, ['timestamp'], item);

  const assetUri = pathOr('', ['locators', 'assetUri'], item);
  const canonicalUrl = pathOr('', ['locators', 'canonicalUrl'], item);
  const uri = pathOr('', ['uri'], item);

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

const getLiveTopStoryItem = (item: Item) => {
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
  item: Item;
  ariaLabelledBy: string;
  eventTrackingData?: EventTrackingBlock | null;
};

const TopStoriesItem = forwardRef(
  (
    { item, ariaLabelledBy, eventTrackingData = null }: TopStoriesItemProps,
    viewRef,
  ) => {
    if (!item || isEmpty(item)) return null;

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
