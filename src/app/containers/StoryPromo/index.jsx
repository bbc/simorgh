import React, { Fragment, useContext } from 'react';
import moment from 'moment';
import { shape } from 'prop-types';
import MediaIndicator from '@bbc/psammead-media-indicator';
import StoryPromoComponent, {
  Headline,
  Summary,
  Link,
} from '@bbc/psammead-story-promo';
import Timestamp from '@bbc/psammead-timestamp-container';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { storyItem } from '../../models/propTypes/storyItem';
import StoryPromoFigure from './Figure';
import { ServiceContext } from '../../contexts/ServiceContext';
import deepGet from '../../lib/json/deepGet';
import formatDuration from '../../lib/utilities/formatDuration';

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
    const durationString = formatDuration(duration);
    const isoDuration = duration.toISOString();
    return (
      <MediaIndicator
        duration={durationString}
        datetime={isoDuration}
        // TODO make offscreenText optional in psammead-media-indicator
        offscreenText=""
        type={type}
      />
    );
  }

  return <MediaIndicator offscreenText={mediaTranslations[type]} type={type} />;
};

const buildLinkContents = (item, mediaTranslations) => {
  const isMedia = deepGet(['cpsType'], item) === 'MAP';

  const headline = deepGet(['headlines', 'headline'], item);

  if (!isMedia) {
    return headline;
  }

  const type = deepGet(['media', 'format'], item);

  // Always gets the first version. Smarter logic may be needed in the future.
  const rawDuration = deepGet(['media', 'versions', 0, 'duration'], item);

  // hilariously, this works. according to moment, null seconds == 0 seconds!
  const duration = moment.duration(rawDuration, 'seconds');
  const durationString = formatDuration(duration);
  const isoDuration = duration.toISOString();

  return (
    // role="text" is required to correct a text splitting bug on iOS VoiceOver.
    // eslint-disable-next-line jsx-a11y/aria-role
    <span role="text">
      <VisuallyHiddenText>{mediaTranslations[type]}, </VisuallyHiddenText>
      <span>{headline}</span>
      {rawDuration && (
        <span>
          <VisuallyHiddenText>
            , <time dateTime={isoDuration}>{durationString}</time>
          </VisuallyHiddenText>
        </span>
      )}
    </span>
  );
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
          <Link href={url}>{buildLinkContents(item, translations.media)}</Link>
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
