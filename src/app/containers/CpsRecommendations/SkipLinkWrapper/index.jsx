import React from 'react';
import { node, string } from 'prop-types';
import styled from 'styled-components';
import { visuallyHiddenTextStyle } from '@bbc/psammead-visually-hidden-text';
import { C_EBON, C_WHITE } from '@bbc/psammead-styles/colours';
import { getSansBold } from '@bbc/psammead-styles/font-styles';
import { GEL_BREVIER } from '@bbc/gel-foundations/typography';

const SKIP_LINK_BORDER = '0.125rem';
const GEL_SPACING_PLUS_HALF = `0.75rem`;

const Wrapper = styled.div`
  position: relative;
`;

const SkipLink = styled.a`
  ${({ service }) => getSansBold(service)}
  ${GEL_BREVIER}
  background-color: ${C_WHITE};
  border: ${SKIP_LINK_BORDER} solid ${C_EBON};
  color: ${C_EBON};
  display: block;
  left: 0;
  line-height: 1;
  padding: ${GEL_SPACING_PLUS_HALF};
  position: absolute;
  text-decoration: none;
  top: 0;
  z-index: 10;

  &:not(:focus):not(:active) {
    ${visuallyHiddenTextStyle}
  }
`;

const EndText = styled.p`
  ${visuallyHiddenTextStyle}
`;

const formatSkipText = title => `Skip ${title} and continue reading`;

const formatSkipEndText = title => `End of ${title}`;

const SkipLinkWrapper = ({ service, title, children }) => {
  const endTextId = 'recommendation_skip_link_end_text';
  return (
    <Wrapper>
      <SkipLink service={service} href={`#${endTextId}`}>
        {formatSkipText(title)}
      </SkipLink>
      {children}
      <EndText tabIndex="-1" id={endTextId}>
        {formatSkipEndText(title)}
      </EndText>
    </Wrapper>
  );
};

SkipLinkWrapper.propTypes = {
  service: string.isRequired,
  children: node.isRequired,
  title: string.isRequired,
};

export default SkipLinkWrapper;
