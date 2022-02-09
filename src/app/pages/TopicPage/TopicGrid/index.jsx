import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';

import { ServiceContext } from '#contexts/ServiceContext';

import {
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { C_PEBBLE } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING,
  GEL_SPACING_HLF_TRPL,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';

import TopicPromo from '../TopicPromo';

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const fixtureHeading = () =>
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed lacus mi. In sed nunc non ante viverra aliquam. Quisque aliquam scelerisque eros, semper fermentum ipsum vehicula eu. Integer nec.'
    .split(' ')
    .slice(0, rand(5, 30))
    .join(' ');
const fixtureCat = () =>
  `http://placekitten.com/${rand(200, 300)}/${rand(170, 250)}`;

const fixture = new Array(23).fill().map((_, id) => ({
  id,
  heading: fixtureHeading(),
  footer: '8th February 2022',
  href: '#',
  imageSrc: fixtureCat(),
  imageAlt: 'evil monster',
}));

const direction = ({ dir }) => (dir === 'ltr' ? 'right' : 'left');
const Item = styled.div`
  vertical-align: top;
  display: inline-block;
  margin-bottom: ${GEL_SPACING_DBL};
  width: 100%;
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    border-top: 1px ${C_PEBBLE} solid;
    padding-top: ${GEL_SPACING};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin-${direction}: ${GEL_SPACING_DBL};
    width: calc(50% - ${GEL_SPACING});
    &:nth-of-type(2n) {
      margin-${direction}: 0;
    }
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-${direction}: ${GEL_SPACING_DBL};
    margin-bottom: ${GEL_SPACING_TRPL};
    width: calc(25% - ${GEL_SPACING_HLF_TRPL});
    &:nth-of-type(4n) {
      margin-${direction}: 0;
    }
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 82rem;
`;

const TopicGrid = () => {
  const { dir } = useContext(ServiceContext);
  return (
    <Wrapper>
      {fixture.map(promo => (
        <Item key={promo.id} dir={dir}>
          <TopicPromo {...promo} />
        </Item>
      ))}
    </Wrapper>
  );
};

TopicGrid.propTypes = {};

TopicGrid.defaultProps = {};

export default TopicGrid;
