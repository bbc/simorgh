import React, { useContext } from 'react';
import { array } from 'prop-types';
import styled from '@emotion/styled';

import SingleCard from './SingleCard';
import { GridItemMedium } from '#app/components/Grid';
import ListCard from './ListCard';
import { ServiceContext } from '#contexts/ServiceContext';

const ScrollablePromo = ({ blocks }) => {
  const isSingleItem = blocks.length === 2;
  const { dir } = useContext(ServiceContext);

  const SingleCardBox = styled.div`
    flex-shrink: 0;
    width: 205px;
    background-color: #ffffff;
    padding: 16px;
  `;

  // IF NO PROMO RETURN NULL
  return (
    <GridItemMedium>
      {isSingleItem ? (
        <SingleCardBox dir={dir}>
          <SingleCard block={blocks[1]} />
        </SingleCardBox>
      ) : (
        <ListCard blocks={blocks} />
      )}
    </GridItemMedium>
  );
};

ScrollablePromo.propTypes = {
  blocks: array.isRequired,
};

export default ScrollablePromo;
