import React from 'react';
import { getSansRegularItalic } from '#psammead/psammead-styles/src/font-styles';
import styled from '@emotion/styled';
import { ServiceContext } from '../../../contexts/ServiceContext';

const italic = styled.i`
  ${({ service }) => getSansRegularItalic(service)}
  font-family: inherit;
  font-weight: inherit;
`;

const bold = ({ children }) => <b>{children}</b>;

const attributeComponents = {
  italic,
  bold,
};

const fallbackAttributeComponent = ({ children }) => children;

const Fragment = ({ text, attributes }) => {
  /*
    Iterates through the attribute array and returns a component based on the attribute type (i.e. 'italic' or 'bold').
    These components are nested inside each other as children as the array is iterated through.
    The text string is passed in as the initial value, so it is the first child or the returned value if there are no attributes.
  */
  const { service } = React.useContext(ServiceContext);
  return (
    attributes.reduce((previousAttribute, attribute) => {
      const Attribute =
        attributeComponents[attribute] || fallbackAttributeComponent; // If attribute is unknown, will use a fallback component that just returns the passed children
      return <Attribute service={service}>{previousAttribute}</Attribute>;
    }, text) || ''
  );
};

export default Fragment;
