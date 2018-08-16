import React from 'react';
import styled from 'styled-components';
import { string, bool, shape } from 'prop-types';
import Markdown from 'markdown-to-jsx';
import mediaQuery from '../../helpers/mediaQueries';
import { C_BLUEJAY } from '../../lib/constants/styles';

const StyledParagraph = styled.p`
  // Font styling below is a subset of BBC GEL Typography "Body Copy"
  font-size: 0.9375em;
  line-height: 1.25rem;
  ${mediaQuery.smartPhoneAndLarger} {
    font-size: 1em;
    line-height: 1.375rem;
  }
`;

const InlineLink = styled.a`
  color: ${C_BLUEJAY};
  border-bottom: 1px solid ${C_BLUEJAY};
  text-decoration: none;
`;

const Text = ({ text, options }) => {
  if (!text) return null;

  return <Markdown options={options}>{text}</Markdown>;
};

Text.propTypes = {
  text: string.isRequired,
  options: shape({
    forceBlock: bool,
  }),
};

Text.defaultProps = {
  options: {
    forceBlock: true,
    overrides: {
      p: {
        component: StyledParagraph,
      },
      a: {
        component: InlineLink,
      },
    },
  },
};

export default Text;
