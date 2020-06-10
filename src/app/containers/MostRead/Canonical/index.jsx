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
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import nodeLogger from '#lib/logger.node';
import { shouldRenderLastUpdated } from '../utilities';
import LastUpdated from './LastUpdated';
import processMostRead from '../utilities/processMostRead';
import mostReadShape from '../utilities/mostReadShape';
import {
  MOST_READ_CLIENT_REQUEST,
  MOST_READ_FETCH_ERROR,
} from '#lib/logger.const';

const logger = nodeLogger(__filename);

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
  const { isAmp } = useContext(RequestContext);
  const {
    service,
    script,
    dir,
    datetimeLocale,
    timezone,
    mostRead: { lastUpdated, numberOfItems },
  } = useContext(ServiceContext);

  const filteredData = processMostRead({
    data: initialData,
    isAmp,
    numberOfItems,
    service,
  });

  const [items, setItems] = useState(filteredData);

  useEffect(() => {
    if (!items) {
      const handleResponse = url => async response => {
        if (!response.ok) {
          throw Error(
            `Unexpected response (HTTP status code ${response.status}) when requesting ${url}`,
          );
        }
        const mostReadData = await response.json();
        setItems(
          processMostRead({
            data: mostReadData,
            isAmp,
            numberOfItems,
            service,
          }),
        );
      };

      const fetchMostReadData = pathname => {
        logger.info(MOST_READ_CLIENT_REQUEST, { url: endpoint });

        return fetch(pathname)
          .then(handleResponse(pathname))
          .catch(error => {
            logger.error(MOST_READ_FETCH_ERROR, {
              url: pathname,
              error: error.toString(),
            });
          });
      };

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
    isAmp,
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
