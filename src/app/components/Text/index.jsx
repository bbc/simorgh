import React from 'react';
import styled from 'styled-components';
import { string, bool, shape } from 'prop-types';
import Markdown from 'markdown-to-jsx';
import mediaQuery from '../../helpers/mediaQueries';
import {
  C_BLUEJAY,
  C_BLUEJAY_LHT,
  C_OAT_LHT,
  C_PEBBLE,
} from '../../lib/constants/styles';

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
  border: 2px solid transparent;
  border-bottom: 1px solid ${C_BLUEJAY};
  text-decoration: none;
  &:hover {
    background-color: ${C_BLUEJAY_LHT};
    border: 2px solid ${C_BLUEJAY_LHT};
    border-bottom: 1px solid ${C_BLUEJAY};
  }
  &:focus {
    background-color: ${C_BLUEJAY};
    border: 2px solid ${C_BLUEJAY};
    border-bottom: 1px solid ${C_OAT_LHT};
    color: ${C_OAT_LHT};
  }
  &:visited {
    color: ${C_PEBBLE};
    border-bottom: 1px solid ${C_PEBBLE};
  }
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
