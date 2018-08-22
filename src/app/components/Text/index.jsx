import React from 'react';
import styled from 'styled-components';
import { string, bool, shape, node } from 'prop-types';
import Markdown from 'markdown-to-jsx';
import mediaQuery from '../../helpers/mediaQueries';
import InlineLink from '../../containers/InlineLink';
import {
  C_STORM,
  FF_NEWS_SANS_REG,
  GEL_SPACING_DBL,
} from '../../lib/constants/styles';

const StyledParagraph = styled.p`
  color: ${C_STORM};
  font-family: ${FF_NEWS_SANS_REG};
  padding-bottom: ${GEL_SPACING_DBL};
  margin: 0;
  // Font styling below is a subset of BBC GEL Typography "Body Copy"
  font-size: 0.9375em;
  line-height: 1.25rem;
  ${mediaQuery.smartPhoneAndLarger} {
    font-size: 1em;
    line-height: 1.375rem;
  }
`;
const Italic = ({ children }) => <i>{children}</i>;
const Bold = ({ children }) => <b>{children}</b>;

const Text = ({ text, options }) => {
  if (!text) return null;

  return <Markdown options={options}>{text}</Markdown>;
};

Italic.propTypes = {
  children: node.isRequired,
};

Bold.propTypes = {
  children: node.isRequired,
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
      em: {
        component: Italic,
      },
      strong: {
        component: Bold,
      },
      a: {
        component: InlineLink,
      },
    },
  },
};

export default Text;
