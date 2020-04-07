import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import 'isomorphic-fetch';
import { bool, string, elementType } from 'prop-types';
import {
  MostReadList,
  MostReadItemWrapper,
  MostReadRank,
  MostReadLink,
} from '@bbc/psammead-most-read';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import { ServiceContext } from '#contexts/ServiceContext';
import webLogger from '#lib/logger.web';
import { shouldRenderLastUpdated } from '../utilities';
import LastUpdated from './LastUpdated';
import filterMostRead from './filterMostRead';
import mostReadShape from '../utilities/mostReadShape';

const logger = webLogger();

const MarginWrapper = styled.div`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }
`;

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
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const mostReadData = await response.json();
      setItems(filterMostRead({ data: mostReadData, numberOfItems }));
    };
    const fetchMostReadData = (pathname) =>
      fetch(pathname, { mode: 'no-cors' })
        .then(handleResponse)
        .catch((e) => logger.error(`HTTP Error: "${e}"`));

    if (!items) {
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

  if (!items) {
    return null;
  }

  return (
    <Wrapper>
      <MarginWrapper>
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
      </MarginWrapper>
    </Wrapper>
  );
};

CanonicalMostRead.propTypes = {
  endpoint: string.isRequired,
  maxTwoColumns: bool,
  initialData: mostReadShape,
  wrapper: elementType,
};

CanonicalMostRead.defaultProps = {
  maxTwoColumns: false,
  initialData: null,
  wrapper: React.Fragment,
};

export default CanonicalMostRead;
