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
import deepGet from '../../lib/json/deepGet';

momentDurationFormatSetup(moment);

const buildMediaIndicator = (item, mediaTranslations) => {
  const isMedia = deepGet(['cpsType'], item) === 'MAP';
  // Only build a media indicator if this is a media item.
  if (!isMedia) {
    return null;
  }

  const type = deepGet(['media', 'format'], item);
  // Always gets the first version. Smarter logic may be needed in the future.
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
        offscreenText={`${mediaTranslations[type]} ${human}`}
        type={type}
      />
    );
  }

  return <MediaIndicator offscreenText={mediaTranslations[type]} type={type} />;
};

const StoryPromo = ({ item }) => {
  const { translations, script } = useContext(ServiceContext);
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
      mediaIndicator={buildMediaIndicator(item, translations.media)}
    />
  );
};

StoryPromo.propTypes = {
  item: shape(storyItem).isRequired,
};

export default StoryPromo;
