import React from 'react';
import { string, bool, shape } from 'prop-types';
import Markdown from 'markdown-to-jsx';

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
  },
};

export default Text;
