import React from 'react';
import persianAfghanistanIdxData from '#data/persian/afghanistan';
import ukraineInRussianIdxData from '#data/ukrainian/ukraine_in_russian';
import IdxPageWithContext from './testHelpers';

export default {
  Component: IdxPageWithContext,
  title: 'Pages/Idx Page',
};

export const Persian = () => (
  <IdxPageWithContext service="persian" pageData={persianAfghanistanIdxData} />
);

Persian.storyName = 'persian/afghanistan';

export const Ukrainian = () => (
  <IdxPageWithContext service="ukrainian" pageData={ukraineInRussianIdxData} />
);

Ukrainian.storyName = 'ukrainian/ukraine_in_russian';
