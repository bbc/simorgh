/** @jsxRuntime classic */
/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import path from 'ramda/src/path';
import useViewTracker from '#hooks/useViewTracker';
import { ServiceContext } from '#app/contexts/ServiceContext';
import generatePromoId from '../generatePromoId';
import LatestMediaItem from './LatestMediaItem';
import styles, {
  StyledPromoItem,
  StyledPromoList,
  StyledSectionLabel,
} from './index.styles';
import {
  LatestMedia,
  TrackingBlock,
  EventTrackingData,
} from './LatestMediaTypes';

const renderLatestMediaList = (
  item: LatestMedia,
  index: number,
  eventTrackingData: EventTrackingData,
  viewRef: () => Promise<void>,
) => {
  const ariaLabelledBy = generatePromoId({
    sectionType: 'latest-media',
    assetUri: null,
    canonicalUrl: item.link,
    uri: null,
    contentType: item.type,
    index,
  });

  return (
    <StyledPromoItem>
      <LatestMediaItem
        item={item}
        ariaLabelledBy={ariaLabelledBy}
        ref={viewRef}
        eventTrackingData={eventTrackingData}
      />
    </StyledPromoItem>
  );
};

const LatestMediaSection = ({ content }: { content: LatestMedia[] }) => {
  const { service, dir, translations } = useContext(ServiceContext);

  const eventTrackingData = {
    block: {
      componentName: 'latest-media',
    },
  };
  const eventTrackingDataSend = path<TrackingBlock>(
    ['block'],
    eventTrackingData,
  );
  const viewRef = useViewTracker(eventTrackingDataSend);
  const LABEL_ID = 'latest-media-heading';
  return (
    <section
      css={styles.LatestMediaSection}
      aria-labelledby={LABEL_ID}
      role="region"
    >
      <StyledSectionLabel
        columnType="secondary"
        dir={dir}
        href={null}
        labelId={LABEL_ID}
        linkText={null}
        script={undefined}
        service={service}
        backgroundColor="transparent"
        overrideHeadingAs={null}
        visuallyHidden={false}
      >
        {translations.latestMediaTitle ?? 'Latest'}
      </StyledSectionLabel>
      <StyledPromoList>
        {content.map((item, index) =>
          renderLatestMediaList(item, index, eventTrackingData, viewRef),
        )}
      </StyledPromoList>
    </section>
  );
};

export default LatestMediaSection;
