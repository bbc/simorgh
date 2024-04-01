import React from 'react';
import BrandContainer from '.';
import withServicesDecorator from '#app/utilities/withServicesDecorator';

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
