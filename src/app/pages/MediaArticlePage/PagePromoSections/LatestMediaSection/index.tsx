import React, { useContext, FC, HTMLAttributes } from 'react';
import { useTheme } from '@emotion/react';
import { arrayOf, shape } from 'prop-types';
import { storyItem } from '#models/propTypes/storyItem';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import isEmpty from 'ramda/src/isEmpty';
import useViewTracker from '#hooks/useViewTracker';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import {
  StyledSectionLabel,
  StyledTopStoriesSection,
  StyledPromoItem,
  StyledPromoList,
} from './index.styles';
import TopStoriesItem from './TopStoriesItem';
import generatePromoId from '../generatePromoId';
import GREY_2 from '../../../../components/';

interface Props extends HTMLAttributes<HTMLElement> {
  item: string;
  index: number;
  eventTrackingData: string;
  viewRef: string;
}

const renderLatestMediaList: FC<Props> = ({
  item,
  index,
  eventTrackingData,
  viewRef,
}: Props) => {
  const contentType = pathOr('', ['contentType'], item);
  const assetUri = pathOr('', ['locators', 'assetUri'], item);
  const canonicalUrl = pathOr('', ['locators', 'canonicalUrl'], item);
  const uri = pathOr('', ['uri'], item);

  const ariaLabelledBy = generatePromoId({
    sectionType: 'latest-media',
    assetUri,
    canonicalUrl,
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

const latestMediaSection = ({ content }) => {
  const { translations, script, service } = useContext(ServiceContext);
  //   const { optimizely } = useContext(OptimizelyContext);
  //   const eventTrackingData = {
  //     block: {
  //       componentName: 'latest-media',
  //       optimizely,
  //     },
  //   };
  //   const eventTrackingDataSend = path(['block'], eventTrackingData);
  //   const viewRef = useViewTracker(eventTrackingDataSend);

  //   const {
  //     palette: { GREY_2 },
  //   } = useTheme();

  if (!content || isEmpty(content)) return null;

  const title = pathOr('Latest', ['latestMediaTitle'], translations);
  const hasSingleContent = content.length === 1;
  const LABEL_ID = 'latest-media-heading';

  const contentType = pathOr('', ['contentType'], content[0]);
  const assetUri = pathOr('', ['locators', 'assetUri'], content[0]);
  const uri = pathOr('', ['uri'], content[0]);
  const ariaLabelledBy = 'Yes';
  //   const ariaLabelledBy = generatePromoId({
  //     sectionType: 'top-stories',
  //     assetUri,
  //     uri,
  //     contentType,
  //   });

  return (
    <StyledTopStoriesSection
      aria-labelledby={LABEL_ID}
      role="region"
      data-e2e={LABEL_ID}
    >
      <StyledSectionLabel
        labelId={LABEL_ID}
        columnType="secondary"
        backgroundColor={GREY_2}
        script={script}
        service={service}
      >
        {title}
      </StyledSectionLabel>

      {hasSingleContent ? (
        <TopStoriesItem
          item={content[0]}
          ariaLabelledBy={ariaLabelledBy}
          //   ref={viewRef}
          //   eventTrackingData={eventTrackingData}
        />
      ) : (
        <StyledPromoList>
          {content.map((item, index) =>
            // renderLatestMediaList(item, index, eventTrackingData, viewRef)
            renderLatestMediaList(item, index),
          )}
        </StyledPromoList>
      )}
    </StyledTopStoriesSection>
  );
};

latestMediaSection.propTypes = { content: arrayOf(shape(storyItem)) };

latestMediaSection.defaultProps = { content: [] };

export default latestMediaSection;
