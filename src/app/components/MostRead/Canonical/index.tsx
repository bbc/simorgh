import { use } from 'react';
import { shouldRenderLastUpdated } from '#lib/utilities/filterPopularStaleData/isDataStale';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
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
  eventTrackingData?: EventTrackingData;
}

const MostRead = ({
  columnLayout = 'multiColumn',
  size,
  data,
  ...props
}: MostReadProps) => {
  const {
    service,
    script,
    dir,
    datetimeLocale,
    serviceDatetimeLocale,
    timezone,
    mostRead: { lastUpdated, numberOfItems = 5 },
  } = use(ServiceContext);

  const items = data.items?.slice(0, numberOfItems) || [];

  const {
    eventTrackingData = {
      componentName: 'most-read',
    },
  } = props;

  const eventTrackingDataExtended = {
    ...eventTrackingData,
    groupTracker: {
      ...eventTrackingData.groupTracker,
      itemCount: items.length,
    },
  };

  const viewTracker = useViewTracker(eventTrackingDataExtended);

  const locale = serviceDatetimeLocale || datetimeLocale;

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
              ref={viewTracker}
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
                id={id}
                position={i + 1}
                eventTrackingData={eventTrackingDataExtended}
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
