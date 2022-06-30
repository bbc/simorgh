import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { arrayOf, shape } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import pathOr from 'ramda/src/pathOr';
import { C_GREY_2 } from '#app/legacy/psammead-styles/src/colours';
import SectionLabel from '#legacy/psammead-section-label/src';
import { StyledWrapper } from './index.styles';
import TopStoriesItem from './TopStoriesMolecules/TopStoriesItem';
import TopStoriesList from './TopStoriesMolecules/TopStoriesList';

const TopStoriesPromo = ({ content }) => {
  const { translations } = useContext(ServiceContext);
  const title = pathOr('Top Stories', ['topStoriesTitle'], translations);
  const hasSingleContent = content.length === 1;
  const LABEL_ID = 'top-stories-heading';

  return (
    <StyledWrapper aria-labelledby={LABEL_ID} role="region">
      <SectionLabel
        labelId={LABEL_ID}
        columnType="secondary"
        backgroundColor={C_GREY_2}
      >
        {title}
      </SectionLabel>

      {hasSingleContent ? (
        <TopStoriesItem item={content[0]} index={0} labelId={LABEL_ID} />
      ) : (
        <TopStoriesList content={content} labelId={LABEL_ID} />
      )}
    </StyledWrapper>
  );
};

TopStoriesPromo.propTypes = { content: arrayOf(shape(storyItem)) };

TopStoriesPromo.defaultProps = { content: [] };

export default TopStoriesPromo;
