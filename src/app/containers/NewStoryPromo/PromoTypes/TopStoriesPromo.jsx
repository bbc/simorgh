import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import SectionLabel from '#legacy/psammead-section-label/src';
import { arrayOf, string, shape } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import pathOr from 'ramda/src/pathOr';
import { C_GREY_2 } from '#app/legacy/psammead-styles/src/colours';
import Promo from '../Promo';
import {
  StyledPromoHeading,
  TopStoriesPromoWrapper,
} from './TopStoriesPromo.styles';

const SingleTopStory = ({ url, heading, mediaType, timestamp }) => {
  const { script, service } = useContext(ServiceContext);
  return (
    <Promo>
      <Promo.BoxWrapper>
        <Promo.Link href={url}>
          {mediaType ? (
            <Promo.MediaIndicator mediaType={mediaType}>
              <StyledPromoHeading script={script} service={service}>
                {heading}
              </StyledPromoHeading>
            </Promo.MediaIndicator>
          ) : (
            <StyledPromoHeading script={script} service={service}>
              {heading}
            </StyledPromoHeading>
          )}
        </Promo.Link>
        <Promo.Timestamp>{timestamp}</Promo.Timestamp>
      </Promo.BoxWrapper>
    </Promo>
  );
};

SingleTopStory.propTypes = {
  mediaType: string,
  heading: string.isRequired,
  timestamp: string,
  url: string.isRequired,
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
          const url = pathOr(null, ['locators', 'assetUri'], promo);
          console.log('TYPE', mediaType);
          return (
            <Promo.ListItem>
              <SingleTopStory
                url={url}
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
  const { script, service, dir, translations } = useContext(ServiceContext);
  const title = pathOr('Top Stories', ['topStoriesTitle'], translations);
  const hasSingleContent = content.length === 1;
  const LABEL_ID = 'top-stories-heading';
  const a11yAttributes = {
    as: 'section',
    role: 'region',
    'aria-labelledby': LABEL_ID,
  };
  return (
    <TopStoriesPromoWrapper data-e2e={LABEL_ID} {...a11yAttributes}>
      <SectionLabel
        script={script}
        service={service}
        dir={dir}
        labelId={LABEL_ID}
        columnType="secondary"
        backgroundColor={C_GREY_2}
      >
        {title}
      </SectionLabel>

      {hasSingleContent ? (
        <SingleTopStory content={content} />
      ) : (
        <ListTopStory content={content} />
      )}
    </TopStoriesPromoWrapper>
  );
};

TopStoriesPromo.propTypes = { content: arrayOf(shape(storyItem)) };

TopStoriesPromo.defaultProps = { content: [] };

export default TopStoriesPromo;
