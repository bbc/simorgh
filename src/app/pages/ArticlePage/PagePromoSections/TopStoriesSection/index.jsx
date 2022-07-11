import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { arrayOf, shape } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import pathOr from 'ramda/src/pathOr';
import { C_GREY_2 } from '#app/legacy/psammead-styles/src/colours';
import SectionLabel from '#legacy/psammead-section-label/src';
import isEmpty from 'ramda/src/isEmpty';
import {
  StyledWrapper,
  FlexPromoList,
  FlexPromoListItem,
} from './index.styles';
import TopStoriesItem from './TopStoriesItem';

const TopStoriesPromo = ({ content }) => {
  const { translations } = useContext(ServiceContext);

  if (!content || isEmpty(content)) return null;

  const title = pathOr('Top Stories', ['topStoriesTitle'], translations);
  const hasSingleContent = content.length === 1;
  const LABEL_ID = 'top-stories-heading';

  return (
    <StyledWrapper aria-labelledby={LABEL_ID} role="region" data-e2e={LABEL_ID}>
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
        <FlexPromoList>
          {content.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <FlexPromoListItem key={`${LABEL_ID}-${index}`}>
              <TopStoriesItem item={item} labelId={LABEL_ID} index={index} />
            </FlexPromoListItem>
          ))}
        </FlexPromoList>
      )}
    </StyledWrapper>
  );
};

TopStoriesPromo.propTypes = { content: arrayOf(shape(storyItem)) };

TopStoriesPromo.defaultProps = { content: [] };

export default TopStoriesPromo;
