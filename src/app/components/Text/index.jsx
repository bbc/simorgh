import React from 'react';
import styled from 'styled-components';
import { string, bool, shape } from 'prop-types';
import Markdown from 'markdown-to-jsx';
import mediaQuery from '../../helpers/mediaQueries';

const StyledParagraph = styled.p`
  // Font styling below is a subset of BBC GEL Typography "Body Copy"
  font-size: 0.938em;
  line-height: 1.25em;
  ${mediaQuery.smartPhoneAndLarger} {
    font-size: 1em;
    line-height: 1.375em;
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
