import React from 'react';
import { node, string } from 'prop-types';
import styled from '@emotion/styled';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { GEL_BREVIER } from '#psammead/gel-foundations/src/typography';

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
  ${({ service }) => getSansRegular(service)}
  ${GEL_BREVIER}
  background-color: ${props => props.theme.palette.WHITE};
  border: ${BORDER_WEIGHT} solid ${props => props.theme.palette.EBON};
  display: block;
  left: 0;
  line-height: 1;
  padding: ${GEL_SPACING_THREE_QRTS};
  position: absolute;
  text-decoration: none;
  top: 0;
  z-index: 10;

  span {
    color: ${props => props.theme.palette.EBON};
  }

  &:hover,
  &:focus {
    span {
      color: ${props => props.theme.palette.POSTBOX};
      border-bottom: 2px solid ${props => props.theme.palette.POSTBOX};
    }
  }

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
        className="focusIndicatorRemove"
      >
        <span>{detokenise(text, dictionary)}</span>
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
