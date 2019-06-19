import React, { Fragment, useContext } from 'react';
import { shape, bool } from 'prop-types';
import StoryPromoComponent, {
  Headline,
  Summary,
  Link,
} from '@bbc/psammead-story-promo';
import Timestamp from '@bbc/psammead-timestamp-container';
import { storyItem } from '../../models/propTypes/storyItem';
import FigureContainer from '../Figure';

import { ServiceContext } from '../../contexts/ServiceContext';
import deepGet from '../../lib/utilities/deepGet';

const StoryPromoImage = ({ imageValues, lazyLoad }) => {
  if (!imageValues) {
    return null;
  }
  const ratio = (imageValues.height / imageValues.width) * 100;
  const src = `https://ichef.bbci.co.uk/news/660${imageValues.path}`;

  return (
    <FigureContainer
      alt={imageValues.altText}
      ratio={ratio}
      src={src}
      {...imageValues}
      useFigure={false}
      lazyLoad={lazyLoad}
      copyright={imageValues.copyrightHolder}
    />
  );
};

StoryPromoImage.propTypes = {
  lazyLoad: bool.isRequired,
  imageValues: storyItem.indexImage.isRequired,
};

const StoryPromo = ({ item, lazyLoadImage, topStory }) => {
  const { script } = useContext(ServiceContext);
  const headline = deepGet(['headlines', 'headline'], item);
  const url = deepGet(['locators', 'assetUri'], item);
  const summary = deepGet(['summary'], item);
  const timestamp = deepGet(['timestamp'], item);

  if (!headline || !url) {
    return null;
  }

  const Info = (
    <Fragment>
      {headline && (
        <Headline script={script}>
          <Link href={url}>{headline}</Link>
        </Headline>
      )}
      {summary && <Summary script={script}>{summary}</Summary>}
      {timestamp && (
        <Timestamp
          timestamp={timestamp * 1000}
          dateTimeFormat="YYYY-MM-DD"
          format="D MMMM YYYY"
          script={script}
          padding={false}
        />
      )}
    </Fragment>
  );

  const imageValues = deepGet(['indexImage'], item);
  const Image = (
    <StoryPromoImage lazyLoad={lazyLoadImage} imageValues={imageValues} />
  );

  return <StoryPromoComponent image={Image} info={Info} topStory={topStory} />;
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
