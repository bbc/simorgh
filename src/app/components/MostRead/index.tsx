import React, { useContext } from 'react';
import 'isomorphic-fetch';
import { RequestContext } from '#contexts/RequestContext';
import nodeLogger from '#lib/logger.node';
import { shouldRenderLastUpdated } from '#lib/utilities/filterPopularStaleData/isDataStale';
import useViewTracker from '#hooks/useViewTracker';
import { ServiceContext } from '#app/contexts/ServiceContext';
import {
  MostReadLink,
  MostReadItemWrapper,
} from '../../legacy/containers/MostRead/Canonical/Item';
import MostReadList from './List';
import MostReadRank from './Rank';
import LastUpdated from './LastUpdated';

const logger = nodeLogger(__filename);

interface MostReadProps {
  endpoint: string;
  columnLayout: 'oneColumn' | 'twoColumn' | 'multiColumn';
  size: 'default' | 'small';
  initialData: object;
  wrapper: React.ElementType;
  eventTrackingData: {
    componentName: string;
  };
}

const MostRead = ({
  endpoint,
  columnLayout = 'multiColumn',
  size,
  initialData,
  wrapper: Wrapper,
  eventTrackingData,
}: MostReadProps) => {
  const { isAmp } = useContext(RequestContext);
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

  return (
    <Wrapper>
      <MostReadList
        numberOfItems={items.length}
        dir={dir}
        columnLayout={columnLayout}
      >
        {items.map((item, i) => (
          <MostReadItemWrapper
            dir={dir}
            key={item.id}
            columnLayout={columnLayout}
            ref={viewRef}
          >
            <MostReadRank
              service={service}
              script={script}
              listIndex={i + 1}
              numberOfItems={items.length}
              dir={dir}
              columnLayout={columnLayout}
              size={size}
            />
            <MostReadLink
              dir={dir}
              service={service}
              script={script}
              title={item.title}
              href={item.href}
              size={size}
              eventTrackingData={eventTrackingData}
            >
              {shouldRenderLastUpdated(item.timestamp) && (
                <LastUpdated
                  prefix={lastUpdated}
                  script={script}
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
    </Wrapper>
  );
};

export default MostRead;
