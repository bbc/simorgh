import React, { useEffect, useState, useContext } from 'react';
import 'isomorphic-fetch';
import { bool, string, shape, node } from 'prop-types';
import {
  MostReadList,
  MostReadItemWrapper,
  MostReadRank,
  MostReadLink,
} from '@bbc/psammead-most-read';
import { ServiceContext } from '#contexts/ServiceContext';
import webLogger from '#lib/logger.web';
import { mostReadRecordIsFresh, shouldRenderLastUpdated } from '../utilities';
import LastUpdated from './LastUpdated';
import filterMostRead from './filterMostRead';

const logger = webLogger();

const CanonicalMostRead = ({
  endpoint,
  maxTwoColumns,
  initialData,
  wrapper: Wrapper,
}) => {
  const {
    service,
    script,
    dir,
    datetimeLocale,
    timezone,
    mostRead: { lastUpdated, numberOfItems },
  } = useContext(ServiceContext);

  const filteredData = filterMostRead({ data: initialData, numberOfItems });

  const [items, setItems] = useState(filteredData);

  useEffect(() => {
    const handleResponse = async (response) => {
      const mostReadData = await response.json();

      // The ARES test endpoint for most read renders fixture data, so the data is stale
      const isTest = process.env.SIMORGH_APP_ENV === 'test';

      // Do not show most read if lastRecordUpdated is greater than 35min as this means PopAPI has failed twice
      // in succession. This suggests ATI may be having issues, hence risk of stale data.
      if (isTest || mostReadRecordIsFresh(mostReadData.lastRecordTimeStamp)) {
        setItems(filterMostRead({ data: mostReadData, numberOfItems }));
      }
    };
    const fetchMostReadData = (pathname) =>
      fetch(pathname, { mode: 'no-cors' })
        .then(handleResponse)
        .catch((e) => logger.error(`HTTP Error: "${e}"`));

    if (items.length === 0) {
      fetchMostReadData(endpoint);
    }
  }, [
    endpoint,
    numberOfItems,
    datetimeLocale,
    lastUpdated,
    script,
    service,
    timezone,
    items,
  ]);

  if (!items.length) {
    return null;
  }

  return (
    <Wrapper>
      <MostReadList
        numberOfItems={items.length}
        dir={dir}
        maxTwoColumns={maxTwoColumns}
      >
        {items.map((item, i) => (
          <MostReadItemWrapper
            dir={dir}
            key={item.id}
            maxTwoColumns={maxTwoColumns}
          >
            <MostReadRank
              service={service}
              script={script}
              listIndex={i + 1}
              numberOfItems={items.length}
              dir={dir}
              maxTwoColumns={maxTwoColumns}
            />
            <MostReadLink
              dir={dir}
              service={service}
              script={script}
              title={item.title}
              href={item.href}
            >
              {shouldRenderLastUpdated(item.timestamp) && (
                <LastUpdated
                  prefix={lastUpdated}
                  script={script}
                  service={service}
                  timestamp={item.timestamp}
                  locale={datetimeLocale}
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

CanonicalMostRead.propTypes = {
  endpoint: string.isRequired,
  maxTwoColumns: bool,
  initialData: shape({}),
  wrapper: node,
};

CanonicalMostRead.defaultProps = {
  maxTwoColumns: false,
  initialData: { records: [] },
  wrapper: React.Fragment,
};

export default CanonicalMostRead;
