import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import clsx from 'clsx';
import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Paragraph from '#app/components/Paragraph';
import Text from '#app/components/Text';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { Chevron, ChevronOrientation, Clock } from '#app/components/icons';
import makeRelativeUrlPath from '#app/lib/utilities/makeRelativeUrlPath';
import { createIchefSrcSet } from '#app/utilities/imageSrcSets';
import Promo from '#components/OptimoPromos';
import isEmpty from 'ramda/src/isEmpty';
import { ViewTracker } from '#app/lib/analyticsUtils/types';
import legacyStyles from './index.styles';
import styles from './index.module.scss';
import { EventTrackingBlock } from '../../../models/types/eventTracking';
import { RelatedContentPreview } from '../types';

type RelatedContentItemProps = {
  item: object;
  ariaLabelledBy: string;
  eventTrackingData?: EventTrackingBlock;
  viewTracker?: ViewTracker;
  prominence?: 'lead' | 'supporting';
  preview?: RelatedContentPreview | null;
};

const RelatedContentItem = ({
  item,
  ariaLabelledBy,
  eventTrackingData,
  viewTracker,
  prominence,
  preview,
}: RelatedContentItemProps) => {
  const { translations, dir, datetimeLocale } = use(ServiceContext);
  const copy = translations.endOfArticleTreatment;
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
  const isLead = prominence === 'lead';
  const leadPreview =
    isLead &&
    preview &&
    makeRelativeUrlPath(preview.href)?.split(/[?#]/)[0] ===
      makeRelativeUrlPath(assetUri)?.split(/[?#]/)[0]
      ? preview
      : null;
  const readTimeCopy = translations.readTime;
  const readingTime =
    leadPreview?.readTime && readTimeCopy?.readTimePrefix && readTimeCopy.minute
      ? `${readTimeCopy.readTimePrefix}: ${leadPreview.readTime.toLocaleString(datetimeLocale)} ${readTimeCopy.minute}`
      : null;
  const destinationLabel = leadPreview ? copy?.readArticle : copy?.openContent;
  const actionLabel = isLead ? destinationLabel : null;

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

  const { primarySrcset, fallbackSrcset, src } = createIchefSrcSet({
    originCode: originCode as string,
    locator: locator as string,
    originalImageWidth: width,
    imageResolutions,
    srcResolution: DEFAULT_IMAGE_RES,
  });

  const timestamp = pathOr<string>(
    '',
    ['model', 'blocks', 2, 'model', 'blocks', 0, 'model', 'timestamp'],
    item,
  );

  const titleTag = timestamp ? 'h3' : 'div';

  const titleHasContent = titleTag === 'h3';
  const image = locator ? (
    <Promo.Image
      src={src}
      altText={altText}
      srcset={primarySrcset}
      fallbackSrcset={fallbackSrcset}
      width={width}
      height={height}
    />
  ) : null;

  return (
    <div
      css={[legacyStyles.wrapper, headlineFirst && legacyStyles.promoFullWidth]}
      {...viewTracker}
    >
      <Promo
        to={assetUri}
        ariaLabelledBy={ariaLabelledBy}
        eventTrackingData={eventTrackingData}
        className={
          prominence
            ? clsx(
                styles.promo,
                prominence === 'lead' ? styles.lead : styles.supporting,
              )
            : undefined
        }
      >
        {prominence && image ? (
          <div className={styles.image}>{image}</div>
        ) : (
          image
        )}
        <Promo.ContentWrapper
          className={prominence ? styles.content : undefined}
        >
          {isLead && copy?.relatedContentLead && (
            <Text as="p" className={styles.eyebrow} size="brevier">
              {copy.relatedContentLead}
            </Text>
          )}
          <Promo.Title
            css={titleHasContent ? legacyStyles.promoTitle : null}
            as={titleTag}
            className={prominence ? styles.title : undefined}
          >
            <Promo.Link>
              <Promo.Content
                headline={
                  actionLabel ? (
                    <>
                      <VisuallyHiddenText>{actionLabel}: </VisuallyHiddenText>
                      {headline}
                    </>
                  ) : (
                    headline
                  )
                }
              />
            </Promo.Link>
          </Promo.Title>
          {leadPreview && (
            <Paragraph className={styles.preview} size="pica">
              {leadPreview.excerpt}
            </Paragraph>
          )}
          {isLead ? (
            <div className={styles.metadata}>
              <Promo.Timestamp css={legacyStyles.promoTimestamp}>
                {timestamp}
              </Promo.Timestamp>
              {readingTime && (
                <Text className={styles.readingTime} size="brevier">
                  <Clock />
                  {readingTime}
                </Text>
              )}
            </div>
          ) : (
            <Promo.Timestamp css={legacyStyles.promoTimestamp}>
              {timestamp}
            </Promo.Timestamp>
          )}
          {actionLabel && (
            <Text
              className={styles.action}
              aria-hidden="true"
              fontVariant="sansBold"
            >
              {actionLabel}
              <Chevron dir={dir} orientation={ChevronOrientation.FORWARD} />
            </Text>
          )}
        </Promo.ContentWrapper>
      </Promo>
    </div>
  );
};

export default RelatedContentItem;
