import React, { useContext } from 'react';
import styled from '@emotion/styled';
import StoryPromo, {
  Headline,
  Summary,
  Link,
} from '#psammead/psammead-story-promo/src';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import pathOr from 'ramda/src/pathOr';
import LiveLabel from '#app/components/LiveLabel';
import ImagePlaceholder from '#psammead/psammead-image-placeholder/src';
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
import { MEDIA_ASSET_PAGE, STORY_PAGE } from '#app/routes/utils/pageTypes';
import PromoTimestamp from '#components/Promo/timestamp';
import { ServiceContext } from '../../../contexts/ServiceContext';
import LinkContents from './LinkContents';
import MediaIndicatorContainer from './MediaIndicator';
import IndexAlsosContainer from './IndexAlsos';
import { getHeadingTagOverride, buildUniquePromoId } from './utilities';
import Image from '../../../components/Image';
import useCombinedClickTrackerHandler from './useCombinedClickTrackerHandler';

const logger = loggerNode(__filename);

const SingleColumnStoryPromo = styled(StoryPromo)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    display: grid;
  }
`;

// eslint-disable-next-line consistent-return
const extractAltText = blocks => {
  // eslint-disable-next-line no-restricted-syntax
  for (const block of blocks) {
    if (block.type === 'paragraph') {
      return block.model.text;
    }
    if (block.model && block.model.blocks) {
      return extractAltText(block.model.blocks);
    }
  }
};

const getBlockByType = (blocks, blockType) => {
  let blockData;
  blocks.forEach(block => {
    if (!blockData && block.type === blockType) {
      blockData = block;
    }
  });
  return blockData;
};

const StoryPromoImage = ({
  isAmp = false,
  useLargeImages,
  imageValues = {
    path: '',
    altText: '',
    height: '',
    width: '',
  },
  lazyLoad = false,
  pageType = '',
}) => {
  if (!imageValues) {
    const landscapeRatio = (9 / 16) * 100;
    return <ImagePlaceholder ratio={landscapeRatio} />;
  }

  // eslint-disable-next-line prefer-const
  let { height, width, path, altText, copyrightHolder } = imageValues;
  let originCode = getOriginCode(path);
  let locator = getLocator(path);
  if (imageValues.defaultPromoImage) {
    const { blocks } = imageValues.defaultPromoImage;
    const rawImageBlock = getBlockByType(blocks, 'rawImage').model;
    const altTextBlocks = getBlockByType(blocks, 'altText').model.blocks;
    altText = extractAltText(altTextBlocks);
    height = rawImageBlock.height;
    width = rawImageBlock.width;
    locator = rawImageBlock.locator;
    originCode = rawImageBlock.originCode;
    copyrightHolder = rawImageBlock.copyrightHolder;
  }
  const imageResolutions = [70, 95, 144, 183, 240, 320, 660];
  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator,
      originalImageWidth: width,
      imageResolutions,
    });
  let sizes = useLargeImages
    ? '(min-width: 1100px) 496px, (min-width: 600px) 45.83vw, 94.29vw'
    : '(min-width: 1020px) 232px, calc(31.86vw - 7px)';
  if (pageType === STORY_PAGE) {
    sizes = '(min-width: 1080px) 315px, 29.74vw';
  }
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

const StoryPromoContainer = ({
  item,
  index = 0,
  promoType = 'regular',
  lazyLoadImage = true,
  dir = 'ltr',
  displayImage = true,
  displaySummary = true,
  isSingleColumnLayout = false,
  serviceDatetimeLocale = null,
  eventTrackingData = null,
  labelId = '',
  sectionType = '',
}) => {
  const { script, service } = useContext(ServiceContext);
  const { isAmp, isLite, pageType, variant } = useContext(RequestContext);
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);

  const linkId = buildUniquePromoId({
    sectionType,
    promoGroupId: labelId,
    promoItem: item,
    promoIndex: index,
  });

  const isAssetTypeCode = getAssetTypeCode(item);
  const isStoryPromoPodcast =
    isAssetTypeCode === 'PRO' &&
    pathOr(null, ['contentType'], item) === 'Podcast';
  const isContentTypeGuide =
    isAssetTypeCode === 'PRO' &&
    pathOr(null, ['contentType'], item) === 'Guide';
  const headline = getHeadline(item);

  const url = getUrl(item, variant);
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

  const isTopOrLeadingPromo = promoType === 'top' || promoType === 'leading';

  const isFirstPromo = index === 0 && isTopOrLeadingPromo;

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
          className="focusIndicatorDisplayInlineBlock"
        >
          {isLive ? (
            <LiveLabel
              id={linkId}
              {...(isFirstPromo && {
                className: 'first-promo',
              })}
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
  const imageValues =
    pathOr(null, ['indexImage'], item) || pathOr(null, ['images'], item);

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
          useLargeImages={isTopOrLeadingPromo}
          lazyLoad={lazyLoadImage}
          imageValues={imageValues}
          pageType={pageType}
        />
      }
      info={Info}
      mediaIndicator={MediaIndicator}
      promoType={promoType}
      dir={dir}
      displayImage={displayImage && !isLite}
    />
  );
};

export default StoryPromoContainer;
