import React from 'react';
import { string, node, func } from 'prop-types';
import Markdown from 'markdown-to-jsx';
import InlineLink from '../../containers/InlineLink';
import Paragraph from '../Paragraph';

const Italic = ({ children }) => <i>{children}</i>;
const Bold = ({ children }) => <b>{children}</b>;

const Text = ({ text, paragraphOverride }) => {
  if (!text) return null;

  const options = {
    forceBlock: true,
    overrides: {
      p: {
        component: paragraphOverride,
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
  };

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
  paragraphOverride: func,
};

Text.defaultProps = {
  paragraphOverride: Paragraph,
};

export default Text;
