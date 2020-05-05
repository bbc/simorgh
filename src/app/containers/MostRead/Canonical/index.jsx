import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import 'isomorphic-fetch';
import { oneOf, string, elementType } from 'prop-types';
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
import processMostRead from '../utilities/processMostRead';
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
  columnLayout,
  size,
  initialData,
  wrapper: Wrapper,
}) => {
  console.log(`initialData: ${initialData}`);
  const {
    service,
    script,
    dir,
    datetimeLocale,
    timezone,
    mostRead: { lastUpdated, numberOfItems },
  } = useContext(ServiceContext);

  const filteredData = processMostRead({ data: initialData, numberOfItems });

  const [items, setItems] = useState(filteredData);

  useEffect(() => {
    if (!items) {
      const handleResponse = async response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const mostReadData = await response.json();
        setItems(processMostRead({ data: mostReadData, numberOfItems }));
      };

      const fetchMostReadData = pathname =>
        fetch(pathname, { mode: 'no-cors' })
          .then(handleResponse)
          .catch(e => logger.error(`HTTP Error: "${e}"`));

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
                size={size}
              />
              <MostReadLink
                dir={dir}
                service={service}
                script={script}
                title={item.title}
                href={item.href}
                size={size}
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
  columnLayout: oneOf(['oneColumn', 'twoColumn', 'multiColumn']),
  size: oneOf(['default', 'small']),
  initialData: mostReadShape,
  wrapper: elementType,
};

CanonicalMostRead.defaultProps = {
  columnLayout: 'multiColumn',
  size: 'default',
  initialData: null,
  wrapper: React.Fragment,
};

export default CanonicalMostRead;
