/** @jsxRuntime classic */
/** @jsx  jsx  */
/* @jsxFrag React.Fragment */
import React, { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import Text from '../Text';

const bold = ({ children }: PropsWithChildren) => (
  <Text as="b" fontVariant="sansBold">
    {children}
  </Text>
);

const italic = ({ children }: PropsWithChildren) => (
  <Text as="i" fontVariant="sansRegularItalic">
    {children}
  </Text>
);

const attributeComponents = {
  italic,
  bold,
};

const fallbackAttributeComponent = ({ children }: PropsWithChildren) =>
  children;

const Fragment = ({ text, attributes = [] }: FragmentProps) => {
  /*
    Iterates through the attribute array and returns a component based on the attribute type (i.e. 'italic' or 'bold').
    These components are nested inside each other as children as the array is iterated through.
    The text string is passed in as the initial value, so it is the first child or the returned value if there are no attributes.
  */
  return attributes.reduce((previousAttribute, attribute) => {
    const Attribute =
      attributeComponents[attribute as keyof typeof attributeComponents] ||
      fallbackAttributeComponent; // If attribute is unknown, will use a fallback component that just returns the passed children
    return <Attribute>{previousAttribute}</Attribute>;
  }, <>{text}</>);
};

type FragmentProps = {
  text: string;
  attributes?: string[];
};

export default Fragment;
