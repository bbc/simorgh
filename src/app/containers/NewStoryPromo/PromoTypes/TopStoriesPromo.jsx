import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { arrayOf, string, shape } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import pathOr from 'ramda/src/pathOr';
import Promo from '../Promo';
import StyledPromoHeading from './TopStoriesPromo.styles';

const SingleTopStory = ({ heading, mediaType, timestamp }) => {
  const { script, service } = useContext(ServiceContext);
  return (
    <Promo>
      <Promo.BoxWrapper>
        <Promo.Link>
          <Promo.MediaIndicator mediaType={mediaType} />
          <StyledPromoHeading script={script} service={service}>
            {heading}
          </StyledPromoHeading>
          <Promo.Timestamp>{timestamp}</Promo.Timestamp>
        </Promo.Link>
      </Promo.BoxWrapper>
    </Promo>
  );
};

SingleTopStory.propTypes = {
  mediaType: string,
  heading: string.isRequired,
  timestamp: string,
};

SingleTopStory.defaultProps = { mediaType: '', timestamp: '' };

const ListTopStory = ({ content }) => {
  return (
    <Promo>
      <Promo.UnorderedList>
        {content.map(promo => {
          const heading = pathOr(null, ['headlines', 'headline'], promo);
          const timestamp = pathOr(null, ['timestamp'], promo);
          const mediaType = pathOr(null, ['media', 'format'], promo);
          return (
            <Promo.ListItem>
              <SingleTopStory
                heading={heading}
                mediaType={mediaType}
                timestamp={timestamp}
              />
            </Promo.ListItem>
          );
        })}
      </Promo.UnorderedList>
    </Promo>
  );
};

ListTopStory.propTypes = { content: arrayOf(shape(storyItem)) };

ListTopStory.defaultProps = { content: [] };

const TopStoriesPromo = ({ content }) => {
  const hasSingleContent = content.length === 1;
  return hasSingleContent ? (
    <SingleTopStory content={content} />
  ) : (
    <ListTopStory content={content} />
  );
};

TopStoriesPromo.propTypes = { content: arrayOf(shape(storyItem)) };

TopStoriesPromo.defaultProps = { content: [] };

export default TopStoriesPromo;
