import React, { useEffect, useState, useContext } from 'react';
import 'isomorphic-fetch';
import { bool, string } from 'prop-types';
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

const logger = webLogger();

const CanonicalMostRead = ({ endpoint, maxTwoColumns }) => {
  const [items, setItems] = useState([]);
  const {
    service,
    script,
    dir,
    datetimeLocale,
    timezone,
    mostRead: { lastUpdated, numberOfItems },
  } = useContext(ServiceContext);

  useEffect(() => {
    const handleResponse = async response => {
      const mostReadData = await response.json();

      // The ARES test endpoint for most read renders fixture data, so the data is stale
      const isTest = process.env.SIMORGH_APP_ENV === 'test';

      // Do not show most read if lastRecordUpdated is greater than 35min as this means PopAPI has failed twice
      // in succession. This suggests ATI may be having issues, hence risk of stale data.
      if (isTest || mostReadRecordIsFresh(mostReadData.lastRecordTimeStamp)) {
        const mostReadItems = mostReadData.records
          .slice(0, numberOfItems)
          .map(({ id, promo: { headlines, locators, timestamp } }) => ({
            id,
            title: headlines.shortHeadline,
            href: locators.assetUri,
            timestamp: shouldRenderLastUpdated(timestamp) && (
              <LastUpdated
                prefix={lastUpdated}
                script={script}
                service={service}
                timestamp={timestamp}
                locale={datetimeLocale}
                timezone={timezone}
              />
            ),
          }));
        setItems(mostReadItems);
      }
    };
    const fetchMostReadData = pathname =>
      fetch(pathname, { mode: 'no-cors' })
        .then(handleResponse)
        .catch(e => logger.error(`HTTP Error: "${e}"`));
    fetchMostReadData(endpoint);
  }, [
    endpoint,
    numberOfItems,
    datetimeLocale,
    lastUpdated,
    script,
    service,
    timezone,
  ]);

  console.log(items);

  if (!items.length) {
    return null;
  }

  return (
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
            {item.timestamp}
          </MostReadLink>
        </MostReadItemWrapper>
      ))}
    </MostReadList>
  );
};

CanonicalMostRead.propTypes = {
  endpoint: string.isRequired,
  maxTwoColumns: bool,
};

CanonicalMostRead.defaultProps = {
  maxTwoColumns: false,
};

export default CanonicalMostRead;
