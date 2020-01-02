import React, { useEffect, useState } from 'react';
import 'isomorphic-fetch';
import { number, oneOf, string, shape } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import Timestamp from '@bbc/psammead-timestamp-container';
import MostRead from '@bbc/psammead-most-read';
import mostReadTranslationsPropTypes from '#models/propTypes/mostRead';
import webLogger from '#lib/logger.web';
import { shouldRenderLastUpdated } from '../utilities';
// import { shouldRenderLastUpdated, mostReadRecordIsFresh } from '../utilities';

const logger = webLogger();

const lastUpdated = ({ locale, prefix, script, service, timestamp }) => (
  <Timestamp
    timestamp={timestamp}
    dateTimeFormat="YYYY-MM-DD"
    prefix={prefix}
    format="LL"
    script={script}
    service={service}
    locale={locale}
  />
);

lastUpdated.propTypes = {
  locale: string.isRequired,
  prefix: string.isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  timestamp: number.isRequired,
};

const CanonicalMostRead = ({
  dir,
  endpoint,
  translations,
  script,
  service,
  locale,
}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const handleResponse = async response => {
      const mostReadData = await response.json();
      // const lastRecordUpdated = mostReadData.lastRecordTimeStamp;

      // do not show most read if lastRecordUpdated is greated than 35min
      // if (mostReadRecordIsFresh(lastRecordUpdated)) {
      //   return;
      // }

      // extracting the data we need from the api
      const tenItems = mostReadData.records.slice(0, 10);
      const sortedItems = [];

      tenItems.forEach(({ id, promo: { headlines, timestamp, locators } }) => {
        const renderTimestampContainer = shouldRenderLastUpdated(timestamp) ? (
          lastUpdated({
            prefix: translations.lastUpdated,
            script,
            service,
            timestamp,
            locale,
          })
        ) : (
          <></>
        );

        sortedItems.push({
          id,
          title: headlines.shortHeadline,
          href: locators.assetUri,
          timestamp: renderTimestampContainer,
        });
      });

      setItems(sortedItems);
    };

    const fetchMostReadData = pathname =>
      fetch(pathname, { mode: 'no-cors' })
        .then(handleResponse)
        .catch(e => logger.error(`HTTP Error: "${e}"`));

    fetchMostReadData(endpoint);
  }, [endpoint, locale, script, service, translations.lastUpdated]);

  return (
    <>
      {items.length !== 0 ? (
        <MostRead
          items={items}
          header={translations.header}
          service={service}
          script={script}
          dir={dir}
        />
      ) : null}
    </>
  );
};

CanonicalMostRead.propTypes = {
  dir: oneOf(['rtl', 'ltr']),
  endpoint: string.isRequired,
  translations: mostReadTranslationsPropTypes.isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  locale: string.isRequired,
};

CanonicalMostRead.defaultProps = {
  dir: 'ltr',
};

export default CanonicalMostRead;
