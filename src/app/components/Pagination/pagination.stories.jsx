/* eslint-disable react/prop-types */
import React from 'react';
import withServicesDecorator from '#storybook/withServicesDecorator';
import Pager from '.';

const Component = ({ activePage, pageCount }) => {
  return <Pager activePage={activePage} pageCount={pageCount} />;
};

export default {
  title: 'Components/Pagination',
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
  decorators: [withServicesDecorator],
};

export const Pagination = Component;
