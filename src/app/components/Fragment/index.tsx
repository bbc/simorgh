/** @jsxRuntime classic */
/** @jsx  jsx  */
/* @jsxFrag React.Fragment */
import React, { PropsWithChildren, useContext } from 'react';
import { Services } from '#app/models/types/global';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { jsx } from '@emotion/react';
import styles from './index.style';

const bold = ({ children }: PropsWithChildren) => <b>{children}</b>;

const italic = ({ children }: PropsWithChildren<ItalicProps>) => (
  <i css={styles.italicStyle}>{children}</i>
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
  const { service } = useContext(ServiceContext);
  return attributes.reduce((previousAttribute, attribute) => {
    const Attribute =
      attributeComponents[attribute as keyof typeof attributeComponents] ||
      fallbackAttributeComponent; // If attribute is unknown, will use a fallback component that just returns the passed children
    return <Attribute service={service}>{previousAttribute}</Attribute>;
  }, <>{text}</>);
};

type FragmentProps = {
  text: string;
  attributes?: string[];
};

type ItalicProps = { service: Services };

export default Fragment;
