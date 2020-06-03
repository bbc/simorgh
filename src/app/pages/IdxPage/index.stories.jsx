import React from 'react';
import { storiesOf } from '@storybook/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import IdxPage from '.';
import persianAfghanistanIdxData from '#data/persian/afghanistan';
import ukraineInRussianIdxData from '#data/ukrainian/ukraine_in_russian';

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
    return (
      <ServiceContextProvider service={service}>
        <IdxPage pageData={pageData} />
      </ServiceContextProvider>
    );
  });
});
