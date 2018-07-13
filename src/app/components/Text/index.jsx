import React from 'react';
import { string, bool, shape } from 'prop-types';
import MD from 'markdown-to-jsx';

const Text = ({ text, options }) => {
  if (!text) return null;

  return <MD options={options}>{text}</MD>;
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
