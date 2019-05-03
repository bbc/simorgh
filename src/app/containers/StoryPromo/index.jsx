import React, { Fragment } from 'react';
import { shape } from 'prop-types';
import { latin } from '@bbc/gel-foundations/scripts';
import StoryPromoComponent, {
  Headline,
  Summary,
} from '@bbc/psammead-story-promo';
import { storyItem } from '../../models/propTypes/storyItem';
import deepGet from '../../helpers/json/deepGet';
import StoryPromoFigure from './Figure';
import Timestamp from '../Timestamp';

const StoryPromo = ({ item }) => {
  const headline = deepGet(['headlines', 'headline'], item);
  const summary = deepGet(['summary'], item);
  const timestamp = deepGet(['timestamp'], item);
  const imageValues = deepGet(['indexImage'], item);

  const Image = imageValues && <StoryPromoFigure {...imageValues} />;

  const Info = (
    <Fragment>
      {headline && <Headline script={latin}>{headline}</Headline>}
      {summary && <Summary script={latin}>{summary}</Summary>}
      {timestamp && (
        <Timestamp
          timestamp={timestamp * 1000}
          dateTimeFormat="YYYY-MM-DD"
          format="D MMMM YYYY"
        />
      )}
    </Fragment>
  );

  return <StoryPromoComponent image={Image} info={Info} />;
};

StoryPromo.propTypes = {
  item: shape(storyItem).isRequired,
};

export default StoryPromo;
