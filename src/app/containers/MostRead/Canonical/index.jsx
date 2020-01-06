import React, { useEffect, useState, useContext } from 'react';
import 'isomorphic-fetch';
import { string } from 'prop-types';
import {
  MostReadList,
  MostReadLink,
  MostReadTitle,
  MostReadRank,
  MostReadItemWrapper,
} from '@bbc/psammead-most-read';
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

      // Do not show most read if lastRecordUpdated is greated than 35min
      if (!mostReadRecordIsFresh(mostReadData.lastRecordTimeStamp)) {
        return;
      }

      const slicedData = mostReadData.records.slice(0, numberOfItems);

      setItems(slicedData);
    };

    const fetchMostReadData = pathname =>
      fetch(pathname, { mode: 'no-cors' })
        .then(handleResponse)
        .catch(e => logger.error(`HTTP Error: "${e}"`));

    fetchMostReadData(endpoint);
  }, [endpoint, numberOfItems]);

  return (
    <>
      {/* Render nothing when items is empty */}
      {items.length !== 0 ? (
        <>
          <MostReadTitle
            header={header}
            script={script}
            service={service}
            dir={dir}
          />
          <MostReadList numberOfItems={numberOfItems} dir={dir}>
            {items.map((item, index) => (
              <MostReadItemWrapper dir={dir} key={item.promo.id}>
                <MostReadRank
                  service={service}
                  script={script}
                  listIndex={index + 1}
                  numberOfItems={numberOfItems}
                  dir={dir}
                />
                <MostReadLink
                  service={service}
                  script={script}
                  title={item.promo.headlines.headline}
                  href={item.promo.locators.assetUri}
                >
                  <LastUpdated
                    prefix={lastUpdated}
                    script={script}
                    service={service}
                    timestamp={item.promo.timestamp}
                    locale={datetimeLocale}
                  />
                </MostReadLink>
              </MostReadItemWrapper>
            ))}
          </MostReadList>
        </>
      ) : null}
    </>
  );
};

CanonicalMostRead.propTypes = {
  endpoint: string.isRequired,
};

export default CanonicalMostRead;
