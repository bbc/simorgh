import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { arrayOf, shape } from 'prop-types';

import { ServiceContext } from '#contexts/ServiceContext';

import {
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#legacy/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_HLF_TRPL,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#legacy/gel-foundations/src/spacings';

import TopicPromo from '../TopicPromo';

const direction = ({ dir }) => (dir === 'ltr' ? 'right' : 'left');

const TopicList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.div`
  vertical-align: top;
  display: inline-block;
  margin-bottom: ${GEL_SPACING_DBL};
  width: 100%;
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    border-top: 1px #e6e8ea solid;
    padding-top: ${GEL_SPACING};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin-${direction}: ${GEL_SPACING_DBL};
    margin-bottom: ${GEL_SPACING_TRPL};
    width: calc(50% - ${GEL_SPACING});
    &:nth-of-type(2n) {
      margin-${direction}: 0;
    }
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-${direction}: ${GEL_SPACING_DBL};
    margin-bottom: 2.125rem;
    width: calc(25% - ${GEL_SPACING_HLF_TRPL});
    &:nth-of-type(4n) {
      margin-${direction}: 0;
    }
  }
`;

const Wrapper = styled.div``;

const TopicGrid = ({ promos }) => {
  const { dir } = useContext(ServiceContext);
  const hasMultiplePromos = promos.length > 1;
  const firstPromo = promos[0];

  if (promos.length === 0) {
    return null;
  }
  return (
    <Wrapper>
      {hasMultiplePromos ? (
        <TopicList role="list" data-testid="topic-promos">
          {promos.map((promo, index) => {
            const isFirstPromo = index === 0;

            return (
              <Item key={promo.id} dir={dir} as="li">
                <TopicPromo {...promo} lazy={!isFirstPromo} />
              </Item>
            );
          })}
        </TopicList>
      ) : (
        <Item key={firstPromo.id} dir={dir}>
          <TopicPromo {...firstPromo} />
        </Item>
      )}
    </Wrapper>
  );
};

TopicGrid.propTypes = {
  promos: arrayOf(shape({})),
};

TopicGrid.defaultProps = {
  promos: [],
};

export default TopicGrid;
