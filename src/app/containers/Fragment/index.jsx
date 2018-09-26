import React from 'react';
import { string, node, arrayOf } from 'prop-types';

const italic = ({ children }) => <i>{children}</i>;
const bold = ({ children }) => <b>{children}</b>;

const attributesToRender = {
  italic,
  bold,
};

const Fragment = ({ text, attributes }) =>
  attributes.reduce((fragment, attribute) => {
    const Attribute = attributesToRender[attribute];
    return <Attribute>{fragment}</Attribute>;
  }, text);

Fragment.propTypes = {
  text: string.isRequired,
  attributes: arrayOf(string).isRequired,
};

bold.propTypes = {
  children: node.isRequired,
};

italic.propTypes = {
  children: node.isRequired,
};

export default Fragment;
