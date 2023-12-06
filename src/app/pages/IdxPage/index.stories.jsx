import React from 'react';
import ukraineInRussianIdxData from '#data/ukrainian/ukraine_in_russian';
import IdxPageWithContext from './testHelpers';

export default {
  Component: IdxPageWithContext,
  title: 'Pages/Idx Page',
};

export const Ukrainian = () => (
  <IdxPageWithContext service="ukrainian" pageData={ukraineInRussianIdxData} />
);

Ukrainian.storyName = 'ukrainian/ukraine_in_russian';
