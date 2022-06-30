import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { arrayOf, shape } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import pathOr from 'ramda/src/pathOr';
import { C_GREY_2 } from '#app/legacy/psammead-styles/src/colours';
import Promo from '../../Promo';
import { TopStoriesPromoWrapper } from './index.styles';
import TopStoriesItem from './TopStoriesMolecules/TopStoriesItem';
import TopStoriesList from './TopStoriesMolecules/TopStoriesList';

const TopStoriesPromo = ({ content }) => {
  const { translations } = useContext(ServiceContext);
  const title = pathOr('Top Stories', ['topStoriesTitle'], translations);
  const hasSingleContent = content.length === 1;
  const LABEL_ID = 'top-stories-heading';

  return (
    <Promo Wrapper={TopStoriesPromoWrapper}>
      <Promo.SectionLabel
        labelId={LABEL_ID}
        columnType="secondary"
        backgroundColor={C_GREY_2}
      >
        {title}
      </Promo.SectionLabel>

      {hasSingleContent ? (
        <TopStoriesItem item={content[0]} index={0} labelId={LABEL_ID} />
      ) : (
        <TopStoriesList content={content} labelId={LABEL_ID} />
      )}
    </Promo>
  );
};

TopStoriesPromo.propTypes = { content: arrayOf(shape(storyItem)) };

TopStoriesPromo.defaultProps = { content: [] };

export default TopStoriesPromo;
