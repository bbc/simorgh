import React from 'react';
import FragementComponent from '.';

const Component = ({ text, attr }: { text: string; attr?: string[] }) => (
  <FragementComponent text={text} attributes={attr} />
);

export const FragmentNormal = () => (
  <Component text="This is a normal fragment" />
);

export const FragmentBold = () => (
  <Component text="This is a bold fragment" attr={['bold']} />
);

export const FragmentItalic = () => (
  <Component text="This is an italic fragment" attr={['italic']} />
);

export const FragmentBoldItalic = () => (
  <Component text="This is a bold italic fragment" attr={['italic', 'bold']} />
);

export default {
  title: 'Components/Fragment',
  Component,
};
