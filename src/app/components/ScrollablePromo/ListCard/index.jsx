import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import { array } from 'prop-types';
import SingleCard from '../SingleCard';
import { ServiceContext } from '#contexts/ServiceContext';

const ScrollPromo = styled.ul`
  padding-bottom: ${GEL_SPACING_TRPL};
  display: flex;
  overflow-wrap: break-word;
  gap: 16px;

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
  flex-shrink: 0;
  width: 205px;
  background-color: #ffffff;
  padding: 16px;
`;

const ListCard = ({ blocks }) => {
  const { dir } = useContext(ServiceContext);
  const threeblocks = blocks.slice(1, 4);

  return (
    <ScrollPromo dir={dir} role="list">
      {threeblocks.map((block, index) => {
        return (
          <StyledList>
            <SingleCard
              block={block}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            />
          </StyledList>
        );
      })}
    </ScrollPromo>
  );
};

ListCard.propTypes = {
  blocks: array.isRequired,
};

export default ListCard;
