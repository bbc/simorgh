import React from 'react';
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
        max: 40,
      },
    },
    pageCount: {
      control: {
        type: 'number',
        min: 2,
        max: 40,
      },
    },
  },
};

export const Pagination = Component;
