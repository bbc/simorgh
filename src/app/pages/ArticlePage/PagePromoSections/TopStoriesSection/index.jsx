import React, { useContext } from 'react';
import { arrayOf, shape } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import { C_GREY_2 } from '#psammead/psammead-styles/src/colours';
import isEmpty from 'ramda/src/isEmpty';
import useViewTracker from '#hooks/useViewTracker';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import {
  StyledSectionLabel,
  StyledTopStoriesSection,
  StyledPromoItem,
  StyledPromoList,
} from './index.styles';
import TopStoriesItem from './TopStoriesItem';
import generatePromoId from '../generatePromoId';

const renderTopStoriesList = (item, index, eventTrackingData, viewRef) => {
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
      <TopStoriesItem
        item={item}
        ariaLabelledBy={ariaLabelledBy}
        ref={viewRef}
        eventTrackingData={eventTrackingData}
      />
    </StyledPromoItem>
  );
};

const TopStoriesSection = ({ content }) => {
  const { translations, script, service } = useContext(ServiceContext);

  const eventTrackingData = {
    block: {
      componentName: 'top-stories',
    },
  };
  const eventTrackingDataSend = path(['block'], eventTrackingData);
  const viewRef = useViewTracker(eventTrackingDataSend);

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
    <StyledTopStoriesSection
      aria-labelledby={LABEL_ID}
      role="region"
      data-e2e={LABEL_ID}
    >
      <StyledSectionLabel
        labelId={LABEL_ID}
        columnType="secondary"
        backgroundColor={C_GREY_2}
        script={script}
        service={service}
      >
        {title}
      </StyledSectionLabel>

      {hasSingleContent ? (
        <TopStoriesItem
          item={content[0]}
          ariaLabelledBy={ariaLabelledBy}
          ref={viewRef}
          eventTrackingData={eventTrackingData}
        />
      ) : (
        <StyledPromoList>
          {content.map((item, index) =>
            renderTopStoriesList(item, index, eventTrackingData, viewRef),
          )}
        </StyledPromoList>
      )}
    </StyledTopStoriesSection>
  );
};

TopStoriesSection.propTypes = { content: arrayOf(shape(storyItem)) };

TopStoriesSection.defaultProps = { content: [] };

export default TopStoriesSection;
