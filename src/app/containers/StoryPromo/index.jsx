import React, { Fragment, useContext } from 'react';
import { shape, bool, string, element } from 'prop-types';
import StoryPromoComponent, {
  Headline,
  Summary,
  Link,
  LiveLabel,
} from '@bbc/psammead-story-promo';
import Timestamp from '@bbc/psammead-timestamp-container';
import pathOr from 'ramda/src/pathOr';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { storyItem } from '../../models/propTypes/storyItem';
import ImageWithPlaceholder from '../ImageWithPlaceholder';

import { ServiceContext } from '../../contexts/ServiceContext';
import createSrcset from '../Image/helpers/srcSet';
import getOriginCode from './imageSrcHelpers/originCode';
import getLocator from './imageSrcHelpers/locator';

import LinkContents from './LinkContents';
import MediaIndicator from './MediaIndicator';
import isTenHoursAgo from '../../lib/utilities/isTenHoursAgo';

const StoryPromoImage = ({ topStory, imageValues, lazyLoad }) => {
  if (!imageValues) {
    return null;
  }

  const { height, width, path } = imageValues;

  const ratio = (height / width) * 100;
  const originCode = getOriginCode(path);
  const locator = getLocator(path);
  const imageResolutions = [70, 95, 144, 183, 240, 320, 480, 624];
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

const StoryPromo = ({ item, lazyLoadImage, topStory }) => {
  const { script, datetimeLocale, service, dir } = useContext(ServiceContext);
  const headline = pathOr(null, ['headlines', 'headline'], item);
  const url = pathOr(null, ['locators', 'assetUri'], item);
  const summary = pathOr(null, ['summary'], item);
  const isLive = pathOr(null, ['cpsType'], item) === 'LIV';
  const timestamp = pathOr(null, ['timestamp'], item);

  const linkcontents = <LinkContents item={item} />;

  if (!headline || !url) {
    return null;
  }

  const Info = (
    <Fragment>
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
      {timestamp && (
        <Timestamp
          locale={datetimeLocale}
          timestamp={timestamp}
          dateTimeFormat="YYYY-MM-DD"
          format="LL"
          script={script}
          padding={false}
          service={service}
          isRelative={isTenHoursAgo(timestamp)}
        />
      )}
    </Fragment>
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
    <StoryPromoComponent
      image={Image}
      info={Info}
      mediaIndicator={
        <MediaIndicator item={item} topStory={topStory} service={service} />
      }
      topStory={topStory}
    />
  );
};

StoryPromo.propTypes = {
  item: shape(storyItem).isRequired,
  lazyLoadImage: bool,
  topStory: bool,
};

StoryPromo.defaultProps = {
  lazyLoadImage: true,
  topStory: false,
};

export default StoryPromo;
