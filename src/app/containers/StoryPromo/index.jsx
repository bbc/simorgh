import React, { Fragment, useContext } from 'react';
import { shape, bool } from 'prop-types';
import StoryPromoComponent, {
  Headline,
  Summary,
  Link,
} from '@bbc/psammead-story-promo';
import Timestamp from '@bbc/psammead-timestamp-container';
import pathOr from 'ramda/src/pathOr';
import { storyItem } from '../../models/propTypes/storyItem';
import ImageWithPlaceholder from '../ImageWithPlaceholder';

import { ServiceContext } from '../../contexts/ServiceContext';
import createSrcset from '../Image/helpers/srcSet';
import getOriginCode from './imageSrcHelpers/originCode';
import getLocator from './imageSrcHelpers/locator';

import LinkContents from './LinkContents';
import MediaIndicator from './MediaIndicator';

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
  lazyLoad: bool.isRequired,
  topStory: bool.isRequired,
  imageValues: shape(storyItem.indexImage).isRequired,
};

const StoryPromo = ({ item, lazyLoadImage, topStory }) => {
  const { script, datetimeLocale, service } = useContext(ServiceContext);
  const headline = pathOr(null, ['headlines', 'headline'], item);
  const url = pathOr(null, ['locators', 'assetUri'], item);
  const summary = pathOr(null, ['summary'], item);
  let timestamp = pathOr(null, ['timestamp'], item);

  if (new Date(timestamp).getFullYear() < 1980) {
    // if the date is before 1980, our timestamp was probably in seconds.
    // this fixes an ares bug - ARES-758 on JIRA.
    // if you come across this in the future, please check if it's no longer needed
    // if so, delete this!
    timestamp *= 1000;
  }

  if (!headline || !url) {
    return null;
  }

  const Info = (
    <Fragment>
      {headline && (
        <Headline script={script} service={service} topStory={topStory}>
          <Link href={url}>
            <LinkContents item={item} />
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
          format="D MMMM YYYY"
          script={script}
          padding={false}
          service={service}
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
