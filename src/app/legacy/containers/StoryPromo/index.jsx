import React, { useContext } from 'react';
import { shape, bool, oneOf, oneOfType, string, number } from 'prop-types';
import styled from '@emotion/styled';
import StoryPromo, {
  Headline,
  Summary,
  Link,
} from '#psammead/psammead-story-promo/src';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import pathOr from 'ramda/src/pathOr';
import LiveLabel from '#psammead/psammead-live-label/src';
import ImagePlaceholder from '#psammead/psammead-image-placeholder/src';
import { storyItem, linkPromo } from '#models/propTypes/storyItem';
import { RequestContext } from '#contexts/RequestContext';
import { createSrcsets } from '#lib/utilities/srcSet';
import buildIChefURL from '#lib/utilities/ichefURL';
import getOriginCode from '#lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';
import {
  getAssetTypeCode,
  getHeadline,
  getUrl,
  getIsLive,
} from '#lib/utilities/getStoryPromoInfo';
import loggerNode from '#lib/logger.node';
import { MEDIA_MISSING } from '#lib/logger.const';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import PromoTimestamp from '#components/Promo/timestamp';
import { ServiceContext } from '../../../contexts/ServiceContext';
import LinkContents from './LinkContents';
import MediaIndicatorContainer from './MediaIndicator';
import IndexAlsosContainer from './IndexAlsos';
import { getHeadingTagOverride, buildUniquePromoId } from './utilities';
import Image from '../../../components/Image';
import useCombinedClickTrackerHandler from './useCombinedClickTrackerHandler';

const logger = loggerNode(__filename);

const PROMO_TYPES = ['top', 'regular', 'leading'];

const SingleColumnStoryPromo = styled(StoryPromo)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    display: grid;
  }
`;

const StoryPromoImage = ({ isAmp, useLargeImages, imageValues, lazyLoad }) => {
  if (!imageValues) {
    const landscapeRatio = (9 / 16) * 100;
    return <ImagePlaceholder ratio={landscapeRatio} />;
  }
  const { height, width, path, altText, copyrightHolder } = imageValues;
  const originCode = getOriginCode(path);
  const locator = getLocator(path);
  const imageResolutions = [70, 95, 144, 183, 240, 320, 660];
  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator,
      originalImageWidth: width,
      imageResolutions,
    });
  const sizes = useLargeImages
    ? '(max-width: 600px) 100vw, (max-width: 1008px) 50vw, 496px'
    : '(max-width: 1008px) 33vw, 321px';
  const DEFAULT_IMAGE_RES = 660;
  const src = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_IMAGE_RES,
  });

  return (
    <Image
      isAmp={isAmp}
      src={src}
      alt={altText}
      srcSet={primarySrcset}
      mediaType={primaryMimeType}
      fallbackSrcSet={fallbackSrcset}
      fallbackMediaType={fallbackMimeType}
      sizes={sizes}
      width={width}
      height={height}
      lazyLoad={lazyLoad}
      attribution={copyrightHolder}
    />
  );
};

StoryPromoImage.propTypes = {
  isAmp: bool,
  useLargeImages: bool.isRequired,
  lazyLoad: bool,
  imageValues: storyItem.indexImage,
};

StoryPromoImage.defaultProps = {
  isAmp: false,
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
  index,
  promoType,
  lazyLoadImage,
  dir,
  displayImage,
  displaySummary,
  isSingleColumnLayout,
  serviceDatetimeLocale,
  eventTrackingData,
  labelId,
  sectionType,
}) => {
  const { script, service, translations } = useContext(ServiceContext);
  const { isAmp, pageType } = useContext(RequestContext);
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);

  const linkId = buildUniquePromoId({
    sectionType,
    promoGroupId: labelId,
    promoItem: item,
    promoIndex: index,
  });

  const liveLabel = pathOr('LIVE', ['media', 'liveLabel'], translations);

  // As screenreaders mispronounce the word 'LIVE', we use visually hidden
  // text to read 'Live' instead, which screenreaders pronounce correctly.
  const liveLabelIsEnglish = liveLabel === 'LIVE';

  const isAssetTypeCode = getAssetTypeCode(item);
  const isStoryPromoPodcast =
    isAssetTypeCode === 'PRO' &&
    pathOr(null, ['contentType'], item) === 'Podcast';
  const isContentTypeGuide =
    isAssetTypeCode === 'PRO' &&
    pathOr(null, ['contentType'], item) === 'Guide';
  const headline = getHeadline(item);
  const url = getUrl(item);
  const isLive = getIsLive(item);

  const overtypedSummary = pathOr(null, ['overtypedSummary'], item);
  const hasWhiteSpaces = overtypedSummary && !overtypedSummary.trim().length;

  let promoSummary;
  if (overtypedSummary && !hasWhiteSpaces) {
    promoSummary = overtypedSummary;
  } else {
    const summary = pathOr(null, ['summary'], item);
    promoSummary = summary;
  }

  const timestamp = pathOr(null, ['timestamp'], item);
  const relatedItems = pathOr(null, ['relatedItems'], item);
  const cpsType = pathOr(null, ['cpsType'], item);
  // If mediaStatusCode is visible, there is an error in rendering the block
  const mediaStatuscode = pathOr(null, ['media', 'statusCode'], item);

  const displayTimestamp =
    timestamp && !isStoryPromoPodcast && !isContentTypeGuide && !isLive;

  if (cpsType === MEDIA_ASSET_PAGE && mediaStatuscode) {
    logger.warn(MEDIA_MISSING, {
      url: pathOr(null, ['section', 'uri'], item),
      mediaStatuscode,
      mediaBlock: item.media,
    });
  }

  const linkcontents = (
    <LinkContents
      item={item}
      isInline={!displayImage}
      // ID is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
      id={!isLive ? linkId : null}
    />
  );

  if (!headline || !url) {
    return null;
  }

  const useLargeImages = promoType === 'top' || promoType === 'leading';

  const headingTagOverride =
    item.headingTag ||
    getHeadingTagOverride({
      pageType,
      isContentTypeGuide,
    });

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
          // Aria-labelledby a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
          aria-labelledby={linkId}
        >
          {isLive ? (
            <LiveLabel
              id={linkId}
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
        <PromoTimestamp serviceDatetimeLocale={serviceDatetimeLocale}>
          {timestamp}
        </PromoTimestamp>
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

  const imageValues = pathOr(null, ['indexImage'], item);

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
      image={
        <StoryPromoImage
          isAmp={isAmp}
          useLargeImages={useLargeImages}
          lazyLoad={lazyLoadImage}
          imageValues={imageValues}
        />
      }
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
  labelId: string,
  index: number,
  sectionType: string,
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
  labelId: '',
  index: 0,
  sectionType: '',
};

export default StoryPromoContainer;
