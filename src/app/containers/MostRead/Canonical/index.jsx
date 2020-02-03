import React, { useEffect, useState, useContext } from 'react';
import 'isomorphic-fetch';
import { string } from 'prop-types';
import { MostRead } from '@bbc/psammead-most-read';
import { ServiceContext } from '#contexts/ServiceContext';
import webLogger from '#lib/logger.web';
import { mostReadRecordIsFresh } from '../utilities';
import LastUpdated from './lastUpdated';

const logger = webLogger();

const CanonicalMostRead = ({ endpoint }) => {
  const [items, setItems] = useState([]);
  const {
    service,
    script,
    dir,
    datetimeLocale,
    mostRead: { header, lastUpdated, numberOfItems },
  } = useContext(ServiceContext);

  useEffect(() => {
    const handleResponse = async response => {
      const mostReadData = await response.json();
      // do not show most read if lastRecordUpdated is greater than 35min as this means PopAPI has failed twice
      // in succession. This suggests ATI may be having issues, hence risk of stale data.
      if (mostReadRecordIsFresh(mostReadData.lastRecordTimeStamp)) {
        const mostReadItems = mostReadData.records
          .slice(0, numberOfItems)
          .map(({ id, promo: { headlines, locators, timestamp } }) => ({
            id,
            title: headlines.shortHeadline,
            href: locators.assetUri,
            timestamp: (
              <LastUpdated
                prefix={lastUpdated}
                script={script}
                service={service}
                timestamp={timestamp}
                locale={datetimeLocale}
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
  }, [endpoint, numberOfItems, datetimeLocale, lastUpdated, script, service]);

  return (
    <>
      {items.length !== 0 && (
        <MostRead
          items={items}
          header={header}
          service={service}
          script={script}
          dir={dir}
          labelId="Most-Read"
        />
      )}
    </>
  );
};

CanonicalMostRead.propTypes = {
  endpoint: string.isRequired,
};

export default CanonicalMostRead;
