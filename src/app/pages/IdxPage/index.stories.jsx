import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import persianAfghanistanIdxData from '#data/persian/afghanistan';
import ukraineInRussianIdxData from '#data/ukrainian/ukraine_in_russian';
import IdxPageWithContext from './testHelpers';

const stories = storiesOf('Pages|Idx Page', module).addDecorator(withKnobs);

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
  stories.add(`${idxPage}`, () => (
    <IdxPageWithContext service={service} pageData={pageData} />
  ));
});
