import React from 'react';
import { Services } from '#app/models/types/global';
import ThemeProvider from '../ThemeProvider';
import FragementComponent from '.';

const Component = ({
  text,
  attr,
  service,
}: {
  text: string;
  attr?: string[];
  service: Services;
}) => (
  <ThemeProvider service={service}>
    <FragementComponent text={text} attributes={attr} />
  </ThemeProvider>
);

export const FragmentNormal = () => (
  <Component text="This is a normal fragment" service="pidgin" />
);

export const FragmentBold = () => (
  <Component text="This is a bold fragment" service="pidgin" attr={['bold']} />
);

export const FragmentItalic = () => (
  <Component
    text="This is an italic fragment"
    service="pidgin"
    attr={['italic']}
  />
);

export const FragmentBoldItalic = () => (
  <Component
    text="This is a bold italic fragment"
    service="pidgin"
    attr={['italic', 'bold']}
  />
);

export default {
  title: 'Components/Fragment',
  Component,
};
