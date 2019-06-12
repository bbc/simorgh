import React, { Fragment, useContext } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { shape } from 'prop-types';
import MediaIndicator from '@bbc/psammead-media-indicator';
import StoryPromoComponent, {
  Headline,
  Summary,
  Link,
} from '@bbc/psammead-story-promo';
import { storyItem } from '../../models/propTypes/storyItem';
import StoryPromoFigure from './Figure';
import Timestamp from '../Timestamp';
import { ServiceContext } from '../../contexts/ServiceContext';
import deepGet from '../../helpers/json/deepGet';

momentDurationFormatSetup(moment);

const buildMediaIndicator = item => {
  const isMedia = deepGet(['cpsType'], item) === 'MAP';
  if (isMedia) {
    const format = deepGet(['media', 'format'], item);
    const capitalisedFormat =
      format.slice(0, 1).toUpperCase() + format.slice(1);
    const rawDuration = deepGet(['media', 'versions', 0, 'duration'], item);
    if (rawDuration) {
      const duration = moment.duration(rawDuration, 'seconds');
      const isOverAnHour = duration.asHours() >= 1;
      return (
        <MediaIndicator
          duration={duration.format(isOverAnHour ? '_HMS_' : '*_MS_')}
          datetime={duration.toISOString()}
          // TODO this will need localising :)
          offscreenText={`${capitalisedFormat} `}
          type={format}
        />
      );
    }
    return <MediaIndicator offscreenText={capitalisedFormat} type={format} />;
  }
  return null;
};

const StoryPromo = ({ item }) => {
  const { script } = useContext(ServiceContext);
  const headline = deepGet(['headlines', 'headline'], item);
  const url = deepGet(['locators', 'assetUri'], item);
  const summary = deepGet(['summary'], item);
  const timestamp = deepGet(['timestamp'], item);
  const imageValues = deepGet(['indexImage'], item);

  const Image = imageValues && <StoryPromoFigure {...imageValues} />;

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
        />
      )}
    </Fragment>
  );

  return (
    <StoryPromoComponent
      image={Image}
      info={Info}
      mediaIndicator={buildMediaIndicator(item)}
    />
  );
};

StoryPromo.propTypes = {
  item: shape(storyItem).isRequired,
};

export default StoryPromo;
