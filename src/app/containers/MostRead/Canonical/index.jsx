import React, { useEffect, useState, useContext } from 'react';

import 'isomorphic-fetch';
import { string } from 'prop-types';
import {
  MostReadList,
  MostReadItemWrapper,
  MostReadRank,
  MostReadLink,
} from '@bbc/psammead-most-read';
import SectionLabel from '@bbc/psammead-section-label';
import { ServiceContext } from '#contexts/ServiceContext';
import webLogger from '#lib/logger.web';
import { mostReadRecordIsFresh, shouldRenderLastUpdated } from '../utilities';
import LastUpdated from './LastUpdated';

const logger = webLogger();

const CanonicalMostRead = ({ endpoint }) => {
  const [items, setItems] = useState([]);
  const {
    service,
    script,
    dir,
    datetimeLocale,
    timezone,
    mostRead: { header, lastUpdated, numberOfItems },
  } = useContext(ServiceContext);

  useEffect(() => {
    const handleResponse = async response => {
      const mostReadData = await response.json();
      const isLocalEnv = process.env.SIMORGH_APP_ENV === 'local';
      // do not show most read if lastRecordUpdated is greater than 35min as this means PopAPI has failed twice
      // in succession. This suggests ATI may be having issues, hence risk of stale data.
      if (
        isLocalEnv ||
        mostReadRecordIsFresh(mostReadData.lastRecordTimeStamp)
      ) {
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
  }, [endpoint, numberOfItems, datetimeLocale, lastUpdated, script, service]);

  return (
    <>
      {items.length ? (
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <section role="region" aria-labelledby="Most-Read">
          <SectionLabel
            script={script}
            labelId="Most-Read"
            service={service}
            dir={dir}
          >
            {header}
          </SectionLabel>
          <MostReadList numberOfItems={items.length} dir={dir}>
            {items.map((item, i) => (
              <MostReadItemWrapper dir={dir} key={item.id}>
                <MostReadRank
                  service={service}
                  script={script}
                  listIndex={i + 1}
                  numberOfItems={items.length}
                  dir={dir}
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
        </section>
      ) : null}
    </>
  );
};

CanonicalMostRead.propTypes = {
  endpoint: string.isRequired,
};

export default CanonicalMostRead;
