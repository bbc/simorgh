/** @jsx jsx */
import { jsx } from '@emotion/react';
import { node, string, shape } from 'prop-types';
import styled from '@emotion/styled';
import detokenise from '#psammead/psammead-detokeniser/src';
import { getSansBold } from '#psammead/psammead-styles/src/font-styles';
import { GEL_BREVIER } from '#psammead/gel-foundations/src/typography';
import { visuallyHiddenStyle } from '../../../lib/styles.const';

const BORDER_WIDTH = '0.125rem';
const GEL_SPACING_PLUS_HALF = `0.75rem`;

const Wrapper = styled.div`
  position: relative;
`;

const SkipLink = styled.a`
  ${({ service }) => getSansBold(service)}
  ${GEL_BREVIER}
  background-color: ${props => props.theme.palette.WHITE};
  border: ${BORDER_WIDTH} solid ${props => props.theme.palette.EBON};
  color: ${props => props.theme.palette.EBON};
  display: block;
  left: 0;
  line-height: 1;
  padding: ${GEL_SPACING_PLUS_HALF};
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
  service,
  endTextId,
  children,
  text,
  endTextVisuallyHidden,
  terms,
}) => {
  return (
    <Wrapper>
      <SkipLink className="skipLink" service={service} href={`#${endTextId}`}>
        {detokenise(text, terms)}
      </SkipLink>
      {children}
      <EndText className="skipLink" tabIndex="-1" id={endTextId}>
        {detokenise(endTextVisuallyHidden, terms)}
      </EndText>
    </Wrapper>
  );
};

SkipLinkWrapper.propTypes = {
  service: string.isRequired,
  children: node.isRequired,
  endTextId: string.isRequired,
  text: string.isRequired,
  endTextVisuallyHidden: string.isRequired,
  terms: shape({}).isRequired,
};

export default SkipLinkWrapper;
