import React from 'react';
import styled from 'styled-components';
import { string, bool, shape } from 'prop-types';
import Markdown from 'markdown-to-jsx';
import mediaQuery from '../../helpers/mediaQueries';

const StyledParagraph = styled.p`
  // Font styling below is a subset of BBC GEL Typography "Body Copy"
  font-size: 0.9375em;
  line-height: 1.25rem;
  ${mediaQuery.smartPhoneAndLarger} {
    font-size: 1em;
    line-height: 1.375rem;
  }
`;
const StyledItalic = ({ children }) => <i>{children}</i>;
const StyledBold = ({ children }) => <b>{children}</b>;

const Text = ({ text, options }) => {
  if (!text) return null;

  return <Markdown options={options}>{text}</Markdown>;
};

StyledItalic.propTypes = {
  children: string.isRequired,
};

StyledBold.propTypes = {
  children: string.isRequired,
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
        component: StyledItalic,
      },
      strong: {
        component: StyledBold,
      },
    },
  },
};

export default Text;
