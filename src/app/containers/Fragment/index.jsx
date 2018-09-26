import React from 'react';
import { string, node, arrayOf } from 'prop-types';

const italic = ({ children }) => <i>{children}</i>;
const bold = ({ children }) => <b>{children}</b>;

const attributeComponents = {
  italic,
  bold,
};

const fallbackAttributeComponent = ({ children }) => children;

const Fragment = ({ text, attributes }) =>
  /*
    Iterates through the attribute array and returns a component based on the attribute type (i.e. 'italic' or 'bold').
    These components are nested inside each other as children as the array is iterated through.
    The text string is passed in as the initial value, so it is the first child or the returned value if there are no attributes.
  */
  attributes.reduce((previousAttribute, attribute) => {
    const Attribute =
      attributeComponents[attribute] || fallbackAttributeComponent; // If attribute is unknown, will use a fallback component that just returns the passed children
    return <Attribute>{previousAttribute}</Attribute>;
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
