import React, { Fragment } from 'react';
import { shape } from 'prop-types';
import { latin } from '@bbc/gel-foundations/scripts';
import StoryPromoComponent, {
  Headline,
  Summary,
} from '@bbc/psammead-story-promo';
import deepGet from '../../helpers/json/deepGet';
import Figure from '../Figure';
import Timestamp from '../Timestamp';

const StoryPromo = ({ item }) => {
  const headline = deepGet(['headlines', 'headline'], item);
  const summary = deepGet(['summary'], item);
  const timestamp = deepGet(['timestamp'], item) * 1000;
  const imageSrc = deepGet(['indexImage', 'path'], item);
  const imageAltText = deepGet(['indexImage', 'altText'], item);
  const imageHeight = deepGet(['indexImage', 'height'], item);
  const imageWidth = deepGet(['indexImage', 'width'], item);
  const imageRatio = (imageHeight / imageWidth) * 100;

  const Image = (
    <Figure
      alt={imageAltText}
      ratio={imageRatio}
      src={`https://ichef.bbci.co.uk/news/660${imageSrc}`}
      height={imageHeight}
      width={imageWidth}
    />
  );

  const Info = (
    <Fragment>
      <Headline script={latin}>{headline}</Headline>
      <Summary script={latin}>{summary}</Summary>
      <Timestamp firstPublished={timestamp} lastPublished={timestamp} />
    </Fragment>
  );

  return <StoryPromoComponent image={Image} info={Info} />;
};

StoryPromo.propTypes = {
  item: shape.isRequired,
};

export default StoryPromo;
