import React from 'react';
import { arrayOf, string, shape } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import Promo from '../Promo';

const SingleTopStory = ({ heading, mediaType }) => {
  return (
    <Promo>
      <Promo.BoxWrapper>
        <Promo.Link>
          <Promo.MediaIndicator mediaType={mediaType} />
          <Promo.Heading>{heading}</Promo.Heading>
        </Promo.Link>
      </Promo.BoxWrapper>
    </Promo>
  );
};

SingleTopStory.propTypes = {
  mediaType: string,
  heading: string.isRequired,
};

SingleTopStory.defaultProps = { mediaType: undefined };

const ListTopStory = ({ content }) => {
  return (
    <Promo>
      <Promo.UnorderedList>
        {content.map(promo => {
          return (
            <Promo.ListItem>
              <SingleTopStory
                heading={promo?.headlines?.headline}
                mediaType={promo?.media?.format}
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
