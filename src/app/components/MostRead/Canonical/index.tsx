import React, { useContext } from 'react';
import { shouldRenderLastUpdated } from '#lib/utilities/filterPopularStaleData/isDataStale';
import useViewTracker from '#hooks/useViewTracker';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { MostReadLink, MostReadItemWrapper } from './Item';
import MostReadList from './List';
import MostReadRank from './Rank';
import LastUpdated from './LastUpdated';
import { ColumnLayout, Direction, Size } from '../types';
import { TypographyScript } from '../../../models/types/theming';

interface MostReadProps {
  columnLayout?: ColumnLayout;
  size: Size;
  data?: {
    records: {
      id: string;
      href: string;
      title: string;
      timestamp: number;
    }[];
  };
  wrapper?: React.ElementType;
  eventTrackingData?: {
    componentName: string;
  };
}

const MostRead = ({
  columnLayout = 'multiColumn',
  size,
  data,
  wrapper: Wrapper,
  eventTrackingData,
}: MostReadProps) => {
  const {
    service,
    script,
    dir,
    datetimeLocale,
    serviceDatetimeLocale,
    timezone,
    mostRead: { lastUpdated, numberOfItems },
  } = useContext(ServiceContext);
  const viewRef = useViewTracker(eventTrackingData);

  const locale = serviceDatetimeLocale || datetimeLocale;

  const items = data?.records.slice(0, numberOfItems) || [];

  const direction = dir as Direction;
  const fontScript = script as TypographyScript;

  return (
    <>
      <MostReadList
        numberOfItems={items.length}
        dir={direction}
        columnLayout={columnLayout}
      >
        {items.map((item, i) => (
          <MostReadItemWrapper
            dir={direction}
            key={item.id}
            columnLayout={columnLayout}
            ref={viewRef}
          >
            <MostReadRank
              service={service}
              script={fontScript}
              listIndex={i + 1}
              numberOfItems={items.length}
              dir={direction}
              columnLayout={columnLayout}
              size={size}
            />
            <MostReadLink
              dir={direction}
              service={service}
              script={fontScript}
              title={item.title}
              href={item.href}
              size={size}
              eventTrackingData={eventTrackingData}
            >
              {shouldRenderLastUpdated(item.timestamp) && (
                <LastUpdated
                  prefix={lastUpdated}
                  script={fontScript}
                  service={service}
                  timestamp={item.timestamp}
                  locale={locale}
                  timezone={timezone}
                />
              )}
            </MostReadLink>
          </MostReadItemWrapper>
        ))}
      </MostReadList>
    </>
  );
};

export default MostRead;
