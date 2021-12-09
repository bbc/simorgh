import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import { array, string } from 'prop-types';
import PromoLink from '../PromoLink';
import { ServiceContext } from '#contexts/ServiceContext';

const ScrollPromo = styled.ul`
  padding-bottom: ${GEL_SPACING_TRPL};
  display: flex;
  overflow-wrap: break-word;

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

const PromoList = ({ blocks, Ourstyle }) => {
  const StyledList = styled.li(Ourstyle);
  const { dir } = useContext(ServiceContext);
  const threeblocks = blocks.slice(1, 4);

  return (
    <ScrollPromo dir={dir} role="list">
      {threeblocks.map((block, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <StyledList key={index} dir={dir} Ourstyle={Ourstyle}>
            <PromoLink block={block} />
          </StyledList>
        );
      })}
    </ScrollPromo>
  );
};

PromoList.propTypes = {
  blocks: array.isRequired,
  Ourstyle: string.isRequired,
};

export default PromoList;
