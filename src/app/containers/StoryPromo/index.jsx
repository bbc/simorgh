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
import Timestamp from '@bbc/psammead-timestamp-container';
import { storyItem } from '../../models/propTypes/storyItem';
import StoryPromoFigure from './Figure';
import { ServiceContext } from '../../contexts/ServiceContext';
import deepGet from '../../helpers/json/deepGet';

momentDurationFormatSetup(moment);

const buildMediaIndicator = item => {
  const isMedia = deepGet(['cpsType'], item) === 'MAP';
  if (isMedia) {
    const type = deepGet(['media', 'format'], item);
    const rawDuration = deepGet(['media', 'versions', 0, 'duration'], item);

    if (rawDuration) {
      const duration = moment.duration(rawDuration, 'seconds');
      const isOverAnHour = duration.asHours() >= 1;
      const durationString = duration.format(isOverAnHour ? '_HMS_' : '*_MS_');
      const isoDuration = duration.toISOString();
      // TODO this will need localising
      const human = duration.format('h [hours] m [minutes] s [seconds]');
      return (
        <MediaIndicator
          duration={durationString}
          datetime={isoDuration}
          // TODO type will need localising
          offscreenText={`${type} ${human}`}
          type={type}
        />
      );
    }

    // TODO offscreenText will need localising
    return <MediaIndicator offscreenText={type} type={type} />;
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
          script={script}
          padding={false}
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
