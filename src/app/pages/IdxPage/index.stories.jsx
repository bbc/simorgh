import React from 'react';
import { storiesOf } from '@storybook/react';
import persianAfghanistanIdxData from '#data/persian/afghanistan';
import ukraineInRussianIdxData from '#data/ukrainian/ukraine_in_russian';
import IdxPageWithContext from './testHelpers';

const stories = storiesOf('Pages|Idx Page', module);

[
  {
    idxPage: 'persian/afghanistan',
    pageData: persianAfghanistanIdxData,
    service: 'persian',
  },
  {
    idxPage: 'ukrainian/ukraine_in_russian',
    pageData: ukraineInRussianIdxData,
    service: 'ukrainian',
  },
].forEach(({ idxPage, pageData, service }) => {
  stories.add(`${idxPage}`, () => {
    return <IdxPageWithContext service={service} pageData={pageData} />;
  });
});
