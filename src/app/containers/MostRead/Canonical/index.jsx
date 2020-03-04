import React, { useEffect, useState, useContext } from 'react';
import 'isomorphic-fetch';
import { bool, string } from 'prop-types';
import styled from 'styled-components';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
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

const MarginWrapper = styled.div`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }
`;

export const MostReadSection = styled.section.attrs(() => ({
  role: 'region',
  'aria-labelledby': 'Most-Read',
  'data-e2e': 'most-read',
}))``;

const CanonicalMostRead = ({ endpoint, maxTwoColumns }) => {
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

  if (!items.length) {
    return null;
  }

  return (
    <>
      <SectionLabel
        script={script}
        labelId="Most-Read"
        service={service}
        dir={dir}
      >
        {header}
      </SectionLabel>
      <MarginWrapper>
        <MostReadList
          numberOfItems={items.length}
          dir={dir}
          maxTwoColumns={maxTwoColumns}
        >
          {items.map((item, i) => (
            <MostReadItemWrapper dir={dir} key={item.id}>
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
      </MarginWrapper>
    </>
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
