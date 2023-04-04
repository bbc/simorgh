/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import path from 'ramda/src/path';
import useViewTracker from '#hooks/useViewTracker';
import generatePromoId from '../generatePromoId';
import LatestMediaItem from './LatestMediaItem';
import styles from './index.styles';
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
    <LatestMediaItem
      item={item}
      ariaLabelledBy={ariaLabelledBy}
      ref={viewRef}
      eventTrackingData={eventTrackingData}
    />
  );
};

const LatestMediaSection = ({ content }: { content: LatestMedia[] }) => {
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

  return (
    <div css={styles.LatestMediaGridWrapper}>
      {content.map((item, index) =>
        renderLatestMediaList(item, index, eventTrackingData, viewRef),
      )}
    </div>
  );
};

export default LatestMediaSection;
