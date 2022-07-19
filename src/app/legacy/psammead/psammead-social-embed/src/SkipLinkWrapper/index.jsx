import React from 'react';
import { node, string } from 'prop-types';
import styled from '@emotion/styled';
import { C_EBON, C_WHITE } from '#legacy/psammead-styles/src/colours';
import { getSansBold } from '#legacy/psammead-styles/src/font-styles';
import { GEL_BREVIER } from '#legacy/gel-foundations/src/typography';

import {
  detokenise,
  dictionaryFactory,
  visuallyHiddenStyle,
} from '../utilities';

const BORDER_WEIGHT = '0.125rem';
const GEL_SPACING_THREE_QRTS = `0.75rem`;

const Wrapper = styled.div`
  position: relative;
`;

const SkipLink = styled.a`
  ${({ service }) => getSansBold(service)}
  ${GEL_BREVIER}
  background-color: ${C_WHITE};
  border: ${BORDER_WEIGHT} solid ${C_EBON};
  color: ${C_EBON};
  display: block;
  left: 0;
  line-height: 1;
  padding: ${GEL_SPACING_THREE_QRTS};
  position: absolute;
  text-decoration: none;
  top: 0;
  z-index: 10;

  &:not(:focus):not(:active) {
    ${visuallyHiddenStyle}
  }
`;

const EndText = styled.p`
  ${visuallyHiddenStyle}
`;

const SkipLinkWrapper = ({
  provider,
  service,
  endTextId,
  text,
  children,
  endTextVisuallyHidden,
}) => {
  const dictionary = dictionaryFactory({ provider });
  return (
    <Wrapper>
      <SkipLink
        service={service}
        href={`#${detokenise(endTextId, dictionary)}`}
      >
        {detokenise(text, dictionary)}
      </SkipLink>
      {children}
      <EndText tabIndex="-1" id={detokenise(endTextId, dictionary)}>
        {detokenise(endTextVisuallyHidden, dictionary)}
      </EndText>
    </Wrapper>
  );
};

SkipLinkWrapper.propTypes = {
  provider: string.isRequired,
  service: string.isRequired,
  endTextId: string.isRequired,
  children: node.isRequired,
  text: string.isRequired,
  endTextVisuallyHidden: string.isRequired,
};

export default SkipLinkWrapper;
