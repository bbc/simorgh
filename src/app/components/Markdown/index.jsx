import React from 'react';
import { string, bool } from 'prop-types';
import MD from 'markdown-to-jsx';

const Markdown = ({ text, options }) => {
  if (!text) return null;

  return <MD options={options}>{text}</MD>;
};

Markdown.propTypes = {
  text: string.isRequired,
  options: {
    forceBlock: bool,
  },
};

Markdown.defaultProps = {
  options: {
    forceBlock: true,
  },
};

export default Markdown;
