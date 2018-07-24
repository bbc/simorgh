import React from 'react';
import styled from 'styled-components';
import { string, bool, shape } from 'prop-types';
import Markdown from 'markdown-to-jsx';
import mediaQuery from '../../helpers/mediaQueries';

const StyledParagraph = styled.p`
  font-size: 0.938em;
  line-height: 1.25em;
  ${mediaQuery.smartPhone} {
    font-size: 1em;
    line-height: 1.25em;
  }
  ${mediaQuery.tablet} {
    font-size: 1.125em;
    line-height: 1.375em;
  }
  ${mediaQuery.desktop} {
    font-size: 1em;
    line-height: 1.25em;
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
    },
  },
};

export default Text;
