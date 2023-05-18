import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getLocalMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import pidginMostReadData from '#data/pidgin/mostRead';
import zhongwenSimpData from '#data/zhongwen/mostRead/simp.json';
import japaneseMostReadData from '../../../../data/japanese/mostRead/index.json';
import persianMostReadData from '../../../../data/persian/mostRead/index.json';
import bengaliMostReadData from '../../../../data/bengali/mostRead/index.json';
import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import MostReadPage from '.';

const Component = ({ service, pageData, variant } = {}) => (
  <BrowserRouter>
    <MostReadPage
      pageType={MOST_READ_PAGE}
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

export default {
  Component,
  title: 'Pages/Most Read Page',
};

export const Pidgin = () => (
  <Component service="pidgin" pageData={pidginMostReadData} />
);

export const ZhongwenSimple = () => (
  <Component service="zhongwen" variant="simp" pageData={zhongwenSimpData} />
);

export const Japanese = () => (
  <Component service="japanese" pageData={japaneseMostReadData} />
);

export const Persian = () => (
  <Component service="persian" pageData={persianMostReadData} />
);

export const Bengali = () => (
  <Component service="bengali" pageData={bengaliMostReadData} />
);
