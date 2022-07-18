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
  StyledPromoItem,
  StyledPromoList,
} from './index.styles';
import TopStoriesItem from './TopStoriesItem';
import generatePromoId from '../generatePromoId';

const renderTopStoriesList = (item, index) => {
  const contentType = pathOr('', ['contentType'], item);
  const assetUri = pathOr('', ['locators', 'assetUri'], item);
  const uri = pathOr('', ['uri'], item);

  const ariaLabelledBy = generatePromoId({
    sectionType: 'top-stories',
    assetUri,
    uri,
    contentType,
    index,
  });

  return (
    <StyledPromoItem key={ariaLabelledBy}>
      <TopStoriesItem item={item} ariaLabelledBy={ariaLabelledBy} />
    </StyledPromoItem>
  );
};

const TopStoriesSection = ({ content }) => {
  const { translations, script, service } = useContext(ServiceContext);

  if (!content || isEmpty(content)) return null;

  const title = pathOr('Top Stories', ['topStoriesTitle'], translations);
  const hasSingleContent = content.length === 1;
  const LABEL_ID = 'top-stories-heading';

  const contentType = pathOr('', ['contentType'], content[0]);
  const assetUri = pathOr('', ['locators', 'assetUri'], content[0]);
  const uri = pathOr('', ['uri'], content[0]);
  const ariaLabelledBy = generatePromoId({
    sectionType: 'top-stories',
    assetUri,
    uri,
    contentType,
  });

  return (
    <StyledWrapper aria-labelledby={LABEL_ID} role="region" data-e2e={LABEL_ID}>
      <SectionLabel
        labelId={LABEL_ID}
        columnType="secondary"
        backgroundColor={C_GREY_2}
        script={script}
        service={service}
      >
        {title}
      </SectionLabel>

      {hasSingleContent ? (
        <TopStoriesItem item={content[0]} ariaLabelledBy={ariaLabelledBy} />
      ) : (
        <StyledPromoList>{content.map(renderTopStoriesList)}</StyledPromoList>
      )}
    </StyledWrapper>
  );
};

TopStoriesSection.propTypes = { content: arrayOf(shape(storyItem)) };

TopStoriesSection.defaultProps = { content: [] };

export default TopStoriesSection;
