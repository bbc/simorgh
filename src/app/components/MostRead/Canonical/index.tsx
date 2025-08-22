import React, { use } from 'react';
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
  } = use(ServiceContext);
  const viewTracker = useViewTracker(eventTrackingData);

  const locale = serviceDatetimeLocale || datetimeLocale;

  const items = data.items?.slice(0, numberOfItems) || [];

  const direction = dir as Direction;
  const fontScript = script as TypographyScript;

  // const buildPromoEventTrackingData = (promo: Summary, i: number) => ({
  //   itemTracker: {
  //     type: 'most-read-promo',
  //     text: promo.title,
  //     position: i + 1,
  //     resourceId: promo.id,
  //     ...(promo.type && { mediaType: promo.type }),
  //     ...(promo.duration && {
  //       duration: moment.duration(promo.duration, 'seconds').asMilliseconds(),
  //     }),
  //   },
  //   ...eventTrackingData,
  // });

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
                eventTrackingData={
                  eventTrackingData
                    ? {
                        ...eventTrackingData,
                        itemTracker: {
                          type: 'most-read-promo',
                          text: title,
                          position: i + 1,
                          resourceId: id || href,
                        },
                      }
                    : undefined
                }
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
