import React, { useEffect, useState, useContext } from 'react';
import 'isomorphic-fetch';
import { bool, string, oneOf } from 'prop-types';
import styled from 'styled-components';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_MARGIN_ABOVE_400PX,
  GEL_MARGIN_BELOW_400PX,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
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

const MostReadSection = styled.section.attrs(() => ({
  role: 'region',
  'aria-labelledby': 'Most-Read',
  'data-e2e': 'most-read',
}))``;

const FrontPageMostReadSection = styled(MostReadSection)`
  /* To centre page layout for Group 4+ */
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const ConstrainedMostReadSection = styled(MostReadSection)`
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_MARGIN_BELOW_400PX} ${GEL_SPACING_TRPL};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_MARGIN_ABOVE_400PX} ${GEL_SPACING_QUAD};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_MARGIN_ABOVE_400PX} ${GEL_SPACING_QUIN};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    width: 100%; /* Needed for IE11 */
    margin: 0 auto ${GEL_SPACING_TRPL};
    padding: 0 ${GEL_SPACING_DBL};
    max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  }
`;

const CanonicalMostRead = ({
  endpoint,
  columnLayout,
  constrainMaxWidth,
  isOnFrontPage,
  linkTypography,
  rankTypography,
}) => {
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

  const StyledMostRead = isOnFrontPage
    ? FrontPageMostReadSection
    : MostReadSection;

  const MostReadSectionWrapper = constrainMaxWidth
    ? ConstrainedMostReadSection
    : StyledMostRead;

  return (
    <MostReadSectionWrapper>
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
          columnLayout={columnLayout}
        >
          {items.map((item, i) => (
            <MostReadItemWrapper
              dir={dir}
              key={item.id}
              columnLayout={columnLayout}
            >
              <MostReadRank
                service={service}
                script={script}
                listIndex={i + 1}
                numberOfItems={items.length}
                dir={dir}
                columnLayout={columnLayout}
                rankTypography={rankTypography}
              />
              <MostReadLink
                dir={dir}
                service={service}
                script={script}
                title={item.title}
                href={item.href}
                linkTypography={linkTypography}
                rankTypography={rankTypography}
              >
                {item.timestamp}
              </MostReadLink>
            </MostReadItemWrapper>
          ))}
        </MostReadList>
      </MarginWrapper>
    </MostReadSectionWrapper>
  );
};

CanonicalMostRead.propTypes = {
  endpoint: string.isRequired,
  constrainMaxWidth: bool.isRequired,
  columnLayout: oneOf(['oneColumn', 'twoColumn', 'multiColumn']),
  isOnFrontPage: bool,
  linkTypography: oneOf(['greatprimer', 'pica']),
  rankTypography: oneOf(['foolscap', 'trafalgar']),
};

CanonicalMostRead.defaultProps = {
  columnLayout: 'multiColumn',
  isOnFrontPage: false,
  linkTypography: 'greatprimer',
  rankTypography: 'foolscap',
};

export default CanonicalMostRead;
