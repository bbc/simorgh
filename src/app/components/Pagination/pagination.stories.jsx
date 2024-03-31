/* eslint-disable react/prop-types */
import React from 'react';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import Pager from '.';
import ThemeProvider from '../ThemeProvider';

const Component = ({
  service = 'news',
  variant = 'default',
  activePage,
  pageCount,
}) => {
  return (
    <ThemeProvider service={service}>
      <ServiceContextProvider service={service} variant={variant}>
        <Pager activePage={activePage} pageCount={pageCount} />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'Topic/Pager',
  Component,
  parameters: { chromatic: { disable: true } },
  args: {
    activePage: 5,
    pageCount: 10,
  },
  argTypes: {
    activePage: {
      control: {
        type: 'number',
        min: 1,
        max: 100,
      },
    },
    pageCount: {
      control: {
        type: 'number',
        min: 2,
        max: 100,
      },
    },
  },
};

export const Pagination = Component;
