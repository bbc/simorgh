import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Pager from '.';
import ThemeProvider from '../../../components/ThemeProvider';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  return (
    <ThemeProvider service={service}>
      <ServiceContextProvider service={service} variant={variant}>
        <Pager
          activePage={number('Active Page', 5, { min: 1, max: 100 })}
          pageCount={number('PageCount', 10, { min: 2, max: 100 })}
        />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'Topic/Pager',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Pagination = Component;
