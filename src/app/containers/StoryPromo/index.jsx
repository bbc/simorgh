import React, { useContext } from 'react';
import { shape, bool, string, element, oneOfType } from 'prop-types';
import StoryPromo, {
  Headline,
  Summary,
  Link,
  LiveLabel,
} from '@bbc/psammead-story-promo';
import Timestamp from '@bbc/psammead-timestamp-container';
import pathOr from 'ramda/src/pathOr';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import ImageWithPlaceholder from '../ImageWithPlaceholder';
import { storyItem, linkPromo } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { createSrcset } from '#lib/utilities/srcSet';
import getOriginCode from '#lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';

import LinkContents from './LinkContents';
import MediaIndicator from './MediaIndicator';
import isTenHoursAgo from '#lib/utilities/isTenHoursAgo';
import IndexAlsosContainer from './IndexAlsos';

const StoryPromoImage = ({ topStory, imageValues, lazyLoad }) => {
  if (!imageValues) {
    const landscapeRatio = (9 / 16) * 100;
    return <ImagePlaceholder ratio={landscapeRatio} />;
  }

  const { height, width, path } = imageValues;

  const ratio = (height / width) * 100;
  const originCode = getOriginCode(path);
  const locator = getLocator(path);
  const imageResolutions = [70, 95, 144, 183, 240, 320, 496, 624];
  const srcset = createSrcset(originCode, locator, width, imageResolutions);
  const sizes = topStory
    ? '(max-width: 600px) 100vw, (max-width: 1008px) 33vw, 237px'
    : '(max-width: 1008px) 33vw, 237px';
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
  topStory: bool.isRequired,
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

const LiveComponent = ({ headline, service, dir }) => (
  // eslint-disable-next-line jsx-a11y/aria-role
  <span role="text">
    <LiveLabel service={service} dir={dir}>
      LIVE
    </LiveLabel>
    <VisuallyHiddenText lang="en-GB">Live, </VisuallyHiddenText>
    {headline}
  </span>
);

LiveComponent.propTypes = {
  service: string.isRequired,
  dir: string.isRequired,
  headline: element.isRequired,
};

const StoryPromoContainer = ({ item, lazyLoadImage, topStory }) => {
  const { script, datetimeLocale, service, timezone, dir } = useContext(
    ServiceContext,
  );
  const isAssetTypeCode = pathOr(null, ['assetTypeCode'], item);
  const isStoryPromoPodcast =
    isAssetTypeCode === 'PRO' &&
    pathOr(null, ['contentType'], item) === 'Podcast';
  let headline;
  let url;
  let isLive;

  if (isAssetTypeCode !== null) {
    headline = pathOr(null, ['name'], item);
    url = pathOr(null, ['uri'], item);
  } else {
    headline = pathOr(null, ['headlines', 'headline'], item);
    url = pathOr(null, ['locators', 'assetUri'], item);
    isLive = pathOr(null, ['cpsType'], item) === 'LIV';
  }

  const summary = pathOr(null, ['summary'], item);
  const timestamp = pathOr(null, ['timestamp'], item);
  const relatedItems = pathOr(null, ['relatedItems'], item);

  const linkcontents = <LinkContents item={item} />;

  if (!headline || !url) {
    return null;
  }

  const Info = (
    <>
      {headline && (
        <Headline script={script} service={service} topStory={topStory}>
          <Link href={url}>
            {isLive ? (
              <LiveComponent
                service={service}
                headline={linkcontents}
                dir={dir}
              />
            ) : (
              linkcontents
            )}
          </Link>
        </Headline>
      )}
      {summary && (
        <Summary script={script} service={service} topStory={topStory}>
          {summary}
        </Summary>
      )}
      {timestamp && !isStoryPromoPodcast && (
        <Timestamp
          locale={datetimeLocale}
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
      {topStory && relatedItems && (
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
  const Image = (
    <StoryPromoImage
      topStory={topStory}
      lazyLoad={lazyLoadImage}
      imageValues={imageValues}
    />
  );

  return (
    <StoryPromo
      image={Image}
      info={Info}
      mediaIndicator={
        <MediaIndicator item={item} topStory={topStory} service={service} />
      }
      topStory={topStory}
    />
  );
};

StoryPromoContainer.propTypes = {
  item: oneOfType([shape(storyItem), shape(linkPromo)]).isRequired,
  lazyLoadImage: bool,
  topStory: bool,
};

StoryPromoContainer.defaultProps = {
  lazyLoadImage: true,
  topStory: false,
};

export default StoryPromoContainer;
