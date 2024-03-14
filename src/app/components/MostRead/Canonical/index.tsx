import React, { useContext } from 'react';
import { shouldRenderLastUpdated } from '#lib/utilities/filterPopularStaleData/isDataStale';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useViewTracker from '../../../hooks/useViewTracker';
import { MostReadLink, MostReadItemWrapper } from './Item';
import MostReadList from './List';
import MostReadRank from './Rank';
import LastUpdated from './LastUpdated';
import { ColumnLayout, MostReadData, Size } from '../types';
import { Direction } from '../../../models/types/global';
import { TypographyScript } from '../../../models/types/theming';

interface MostReadProps {
  columnLayout?: ColumnLayout;
  size: Size;
  data: MostReadData;
  eventTrackingData?: {
    componentName: string;
    useReverb?: boolean;
  };
}

const MostRead = ({
  columnLayout = 'multiColumn',
  size,
  data,
  eventTrackingData,
}: MostReadProps) => {
  const {
    service,
    script,
    dir,
    datetimeLocale,
    serviceDatetimeLocale,
    timezone,
    mostRead: { lastUpdated, numberOfItems = 5 },
  } = useContext(ServiceContext);
  const viewRef = useViewTracker(eventTrackingData);

  const locale = serviceDatetimeLocale || datetimeLocale;

  const items = data.items?.slice(0, numberOfItems) || [];

  const direction = dir as Direction;
  const fontScript = script as TypographyScript;

  return (
    <MostReadList
      numberOfItems={items.length}
      dir={direction}
      columnLayout={columnLayout}
    >
      {items.map(
        ({ id, timestamp, title, href }, i) =>
          title &&
          href && (
            <MostReadItemWrapper
              dir={direction}
              key={id}
              columnLayout={columnLayout}
              ref={viewRef}
            >
              <MostReadRank
                service={service}
                listIndex={i + 1}
                numberOfItems={items.length}
                dir={direction}
                columnLayout={columnLayout}
                size={size}
              />
              <MostReadLink
                dir={direction}
                service={service}
                title={title}
                href={href}
                size={size}
                eventTrackingData={eventTrackingData}
              >
                {shouldRenderLastUpdated(timestamp) && timestamp && (
                  <LastUpdated
                    prefix={lastUpdated}
                    script={fontScript}
                    service={service}
                    timestamp={timestamp}
                    locale={locale}
                    timezone={timezone}
                  />
                )}
              </MostReadLink>
            </MostReadItemWrapper>
          ),
      )}
    </MostReadList>
  );
};

export default MostRead;
