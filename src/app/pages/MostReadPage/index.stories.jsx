import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { getLocalMostReadEndpoint } from '#lib/utilities/getMostReadUrls';
import MostReadPage from '.';
import pidginMostReadData from '#data/pidgin/mostRead';
import zhongwenSimpData from '#data/zhongwen/mostRead/simp.json';

const stories = storiesOf('Pages|Most Read Page', module);

[
  {
    service: 'pidgin',
    variant: 'default',
    pageData: pidginMostReadData,
  },
  {
    service: 'zhongwen',
    variant: 'simp',
    pageData: zhongwenSimpData,
  },
].forEach(({ service, pageData, variant }) => {
  stories.add(`${service} ${variant === 'default' ? '' : variant}`, () => {
    return (
      <BrowserRouter>
        <MostReadPage
          pageType="mostRead"
          isAmp={false}
          pathname="/path"
          status={200}
          pageData={pageData}
          service={service}
          variant={variant}
          mostReadEndpointOverride={getLocalMostReadEndpoint({
            service,
            variant,
          })}
        />
      </BrowserRouter>
    );
  });
});
