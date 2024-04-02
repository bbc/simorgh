import React from 'react';
import withServicesDecorator from '#storybook/withServicesDecorator';
import BrandContainer from '.';

const Component = () => {
  return <BrandContainer />;
};

export default {
  title: 'Containers/Brand',
  Component,
  decorators: [withServicesDecorator],
  parameters: { chromatic: { disable: true } },
};

export const Brand = (_, globalArgs) => <Component {...globalArgs} />;
