import React from 'react';
import BrandContainer from '.';

const Component = () => {
  return <BrandContainer />;
};

export default {
  title: 'Containers/Brand',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Brand = () => <Component />;
