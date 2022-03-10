import React from 'react';
import { withKnobs, select, number } from '@storybook/addon-knobs';
import Pager from '.';

// eslint-disable-next-line react/prop-types
const Component = () => {
  return (
    <Pager
      activePage={number('Active Page', 5, { min: 1, max: 100 })}
      pageCount={number('PageCount', 10, { min: 2, max: 100 })}
      deviceSize={select(
        'Device Size',
        {
          mobile: 'mobile',
          tablet: 'tablet',
          desktop: 'desktop',
        },
        'desktop',
      )}
    />
  );
};

export default {
  title: 'Topic/Pager',
  Component,
  decorators: [withKnobs],
  parameters: { chromatic: { disable: true } },
};

export const Pagination = Component;
