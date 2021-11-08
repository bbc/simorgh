import React, { useContext } from 'react';
import { shape, bool, oneOf, oneOfType, string } from 'prop-types';
import styled from '@emotion/styled';
import StoryPromo, { Headline, Summary, Link } from '@bbc/psammead-story-promo';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import Timestamp from '@bbc/psammead-timestamp-container';
import LiveLabel from '@bbc/psammead-live-label';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import ImageWithPlaceholder from '../ImageWithPlaceholder';
import { storyItem, linkPromo } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { createSrcset } from '#lib/utilities/srcSet';
import getOriginCode from '#lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';
import {
  getAssetTypeCode,
  getHeadline,
  getUrl,
  getIsLive,
} from '#lib/utilities/getStoryPromoInfo';
import LinkContents from './LinkContents';
import MediaIndicatorContainer from './MediaIndicator';
import isTenHoursAgo from '#lib/utilities/isTenHoursAgo';
import IndexAlsosContainer from './IndexAlsos';
import loggerNode from '#lib/logger.node';
import { MEDIA_MISSING } from '#lib/logger.const';
import { getHeadingTagOverride } from './utilities';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import useCombinedClickTrackerHandler from './useCombinedClickTrackerHandler';

const logger = loggerNode(__filename);

const PROMO_TYPES = ['top', 'regular', 'leading'];

const SingleColumnStoryPromo = styled(StoryPromo)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    display: grid;
  }
`;

const StoryPromoImage = ({ useLargeImages, imageValues, lazyLoad }) => {
  if (!imageValues) {
    const landscapeRatio = (9 / 16) * 100;
    return <ImagePlaceholder ratio={landscapeRatio} />;
  }

  const { height, width, path } = imageValues;

  const ratio = (height / width) * 100;
  const originCode = getOriginCode(path);
  const locator = getLocator(path);
  const imageResolutions = [70, 95, 144, 183, 240, 320, 660];
  const srcset = createSrcset(originCode, locator, width, imageResolutions);
  const sizes = useLargeImages
    ? '(max-width: 600px) 100vw, (max-width: 1008px) 50vw, 496px'
    : '(max-width: 1008px) 33vw, 321px';
  const DEFAULT_IMAGE_RES = 660;
  const src = `https://ichef.bbci.co.uk/news/${DEFAULT_IMAGE_RES}${path}`;

  return (
    <ImageWithPlaceholder
      alt={imageValues.altText}
      ratio={ratio}
      src={src}
      fallback={false}
      {...imageValues}
      lazyLoad={lazyLoad}
      copyright={imageValues.copyrightHolder}
      srcset={srcset}
      sizes={sizes}
    />
  );
};

StoryPromoImage.propTypes = {
  useLargeImages: bool.isRequired,
  lazyLoad: bool,
  imageValues: storyItem.indexImage,
};

StoryPromoImage.defaultProps = {
  lazyLoad: false,
  imageValues: shape({
    path: '',
    altText: '',
    height: '',
    width: '',
  }),
};

const StoryPromoContainer = ({
  item,
  promoType,
  lazyLoadImage,
  dir,
  displayImage,
  displaySummary,
  isSingleColumnLayout,
  serviceDatetimeLocale,
  eventTrackingData,
}) => {
  const {
    altCalendar,
    script,
    datetimeLocale,
    service,
    translations,
    timezone,
  } = useContext(ServiceContext);
  const { pageType } = useContext(RequestContext);
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);

  const liveLabel = translations?.media?.liveLabel || 'LIVE';

  // As screenreaders mispronounce the word 'LIVE', we use visually hidden
  // text to read 'Live' instead, which screenreaders pronounce correctly.
  const liveLabelIsEnglish = liveLabel === 'LIVE';

  const isAssetTypeCode = getAssetTypeCode(item);
  const isStoryPromoPodcast =
    isAssetTypeCode === 'PRO' && (item.contentType || null) === 'Podcast';
  const isContentTypeGuide =
    (isAssetTypeCode === 'PRO' && item?.contentType) || null === 'Guide';
  const headline = getHeadline(item);
  const url = getUrl(item);
  const isLive = getIsLive(item);

  const overtypedSummary = item?.overtypedSummary || null;
  const hasWhiteSpaces = overtypedSummary && !overtypedSummary.trim().length;

  let promoSummary;
  if (overtypedSummary && !hasWhiteSpaces) {
    promoSummary = overtypedSummary;
  } else {
    const summary = item?.summary || null;
    promoSummary = summary;
  }

  const timestamp = item?.timestamp || null;
  const relatedItems = item?.relatedItems || null;
  const cpsType = item?.cpsType || null;
  // If mediaStatusCode is visible, there is an error in rendering the block
  const mediaStatuscode = item?.media?.statusCode || null;

  const displayTimestamp =
    timestamp && !isStoryPromoPodcast && !isContentTypeGuide && !isLive;

  if (cpsType === MEDIA_ASSET_PAGE && mediaStatuscode) {
    logger.warn(MEDIA_MISSING, {
      url: item?.section?.uri || null,
      mediaStatuscode,
      mediaBlock: item.media,
    });
  }

  const linkcontents = <LinkContents item={item} isInline={!displayImage} />;

  if (!headline || !url) {
    return null;
  }

  const useLargeImages = promoType === 'top' || promoType === 'leading';

  const headingTagOverride = getHeadingTagOverride({
    pageType,
    isContentTypeGuide,
  });

  const locale = serviceDatetimeLocale || datetimeLocale;

  const StyledLink = styled(Link)`
    overflow-wrap: anywhere;
  `;

  const Info = (
    <>
      <Headline
        script={script}
        service={service}
        promoType={promoType}
        promoHasImage={displayImage}
        as={headingTagOverride}
      >
        <StyledLink
          href={url}
          onClick={eventTrackingData ? handleClickTracking : null}
        >
          {isLive ? (
            <LiveLabel
              service={service}
              dir={dir}
              liveText={liveLabel}
              ariaHidden={liveLabelIsEnglish}
              offScreenText={liveLabelIsEnglish ? 'Live' : null}
            >
              {linkcontents}
            </LiveLabel>
          ) : (
            linkcontents
          )}
        </StyledLink>
      </Headline>
      {promoSummary && displaySummary && (
        <Summary
          script={script}
          service={service}
          promoType={promoType}
          promoHasImage={displayImage}
        >
          {promoSummary}
        </Summary>
      )}
      {displayTimestamp && (
        <Timestamp
          altCalendar={altCalendar}
          locale={locale}
          timestamp={timestamp}
          dateTimeFormat="YYYY-MM-DD"
          format="LL"
          script={script}
          padding={false}
          service={service}
          timezone={timezone}
          isRelative={isTenHoursAgo(timestamp)}
        />
      )}
      {promoType === 'top' && relatedItems && (
        <IndexAlsosContainer
          alsoItems={relatedItems}
          script={script}
          service={service}
          dir={dir}
        />
      )}
    </>
  );

  const imageValues = item?.indexImage || null;
  const Image = (
    <StoryPromoImage
      useLargeImages={useLargeImages}
      lazyLoad={lazyLoadImage}
      imageValues={imageValues}
    />
  );

  const MediaIndicator = (
    <MediaIndicatorContainer
      item={item}
      script={script}
      service={service}
      dir={dir}
      isInline={!displayImage}
    />
  );

  const StoryPromoComponent = isSingleColumnLayout
    ? SingleColumnStoryPromo
    : StoryPromo;

  return (
    <StoryPromoComponent
      data-e2e="story-promo"
      image={Image}
      info={Info}
      mediaIndicator={MediaIndicator}
      promoType={promoType}
      dir={dir}
      displayImage={displayImage}
    />
  );
};

StoryPromoContainer.propTypes = {
  item: oneOfType([shape(storyItem), shape(linkPromo)]).isRequired,
  promoType: oneOf(PROMO_TYPES),
  lazyLoadImage: bool,
  dir: oneOf(['ltr', 'rtl']),
  displayImage: bool,
  displaySummary: bool,
  isSingleColumnLayout: bool,
  serviceDatetimeLocale: string,
  eventTrackingData: shape({
    block: shape({
      componentName: string,
    }),
    link: shape({
      componentName: string,
      url: string,
      format: string,
    }),
  }),
};

StoryPromoContainer.defaultProps = {
  promoType: 'regular',
  lazyLoadImage: true,
  dir: 'ltr',
  displayImage: true,
  displaySummary: true,
  isSingleColumnLayout: false,
  serviceDatetimeLocale: null,
  eventTrackingData: null,
};

export default StoryPromoContainer;
