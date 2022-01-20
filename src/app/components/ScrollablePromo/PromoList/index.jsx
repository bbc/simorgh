import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { arrayOf, shape, string, oneOfType, object } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import Promo from '../Promo';

const ScrollPromo = styled.ul`
  display: flex;
  list-style: none;
  ${({ dir }) => `padding-${dir === 'ltr' ? 'left' : 'right'}: 0;`}
  margin: 0;

  overflow-x: scroll;
  /* Avoid using smooth scrolling as it causes accessibility issues */
  scroll-behavior: auto;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledList = styled.li`
  display: flex;
  flex-shrink: 0;
  @media (min-width: ${GEL_GROUP_0_SCREEN_WIDTH_MIN}){
    margin-${({ dir }) => (dir === 'ltr' ? 'left' : 'right')}: ${GEL_SPACING};
    &:first-child {
      margin-${({ dir }) => (dir === 'ltr' ? 'left' : 'right')}: ${GEL_SPACING};
    }
    &:last-child {
      margin-${({ dir }) => (dir === 'ltr' ? 'right' : 'left')}: ${GEL_SPACING};
    }
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}){
    margin-${({ dir }) =>
      dir === 'ltr' ? `left` : `right`}: ${GEL_SPACING_DBL};
      &:first-child {
        margin-${({ dir }) =>
          dir === 'ltr' ? 'left' : 'right'}: ${GEL_SPACING_DBL};
      }
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}){
    margin-${({ dir }) =>
      dir === 'ltr' ? `left` : `right`}: ${GEL_SPACING_DBL};
      &:first-child {
        margin-${({ dir }) => (dir === 'ltr' ? 'left' : 'right')}: 0;
      }
  }
`;

const PromoList = ({ blocks }) => {
  const { dir } = useContext(ServiceContext);

  const listBlocks = blocks.slice(0, 3);

  return (
    <ScrollPromo dir={dir} role="list">
      {listBlocks.map((block, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <StyledList key={index} dir={dir}>
            <Promo block={block} />
          </StyledList>
        );
      })}
    </ScrollPromo>
  );
};

PromoList.propTypes = {
  blocks: arrayOf(
    shape({
      type: string.isRequired,
      model: shape({
        blocks: arrayOf(oneOfType([string, object])),
      }).isRequired,
    }),
  ).isRequired,
};

export default PromoList;
