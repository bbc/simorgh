import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
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
].forEach(({ idxPage, pageData, service = 'persian' }) => {
  stories.add(`${idxPage}`, () => {
    return (
      <BrowserRouter>
        <ToggleContextProvider
          service={service}
          origin="https://www.test.bbc.com"
        >
          <RequestContextProvider
            pageType="IDX"
            service={service}
            pathname="/pathname"
            data={{ status: 200 }}
            isAmp={false}
          >
            <ServiceContextProvider service={service}>
              <IdxPage pageData={pageData} />
            </ServiceContextProvider>
          </RequestContextProvider>
        </ToggleContextProvider>
      </BrowserRouter>
    );
  });
});
